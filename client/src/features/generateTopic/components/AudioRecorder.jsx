"use client";
import MicRecorder from "mic-recorder-to-mp3";
import React, { useState, useEffect } from "react";

// 配列の長さが4になるように調整する関数
function adjustData(data) {
  while (data && data.topics && data.topics.length < 4) {
    data.topics.push("");
  }
  return data;
}

function App() {
  const [recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [stream, setStream] = useState(null);
  const [topics, setTopics] = useState([]);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Permission Granted");
        setIsBlocked(false);
        setStream(stream);
        recorder
          .start()
          .then(() => {
            setIsRecording(true);
          })
          .catch((e) => console.error(e));
      })
      .catch((err) => {
        console.log("Permission Denied");
        setIsBlocked(true);
        alert("マイクのアクセスが拒否されました。設定を確認してください。");
      });
  };

  const stopRecording = async () => {
    console.log("録音を終了しました。");
    try {
      const [buffer, blob] = await recorder.stop().getMp3();
      const blobURL = URL.createObjectURL(blob);
      console.log(blobURL);
      setBlobURL(blobURL);
      setIsRecording(false);
      console.log("Recording stopped.");

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }

      sendAudioData(blob);
    } catch (e) {
      console.error("Error stopping recording:", e);
    }
  };

  const sendAudioData = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      const data = {
        file: base64data,
      };
      fetch("http://localhost:8080/audio", {
        // 8080番ポートに変更
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.transcription) {
            extractTopics(data.transcription);
          } else {
            console.error("Invalid data:", data);
          }
        })
        .catch((error) => {
          console.error("エラー:", error);
        });
    };
  };

  const extractTopics = (transcription) => {
    const data = {
      transcription: transcription,
    };
    fetch("http://localhost:8080/topics", {
      // 8080番ポートに変更
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.topics) {
          setTopics(adjustData(data).topics);
        } else {
          console.error("Invalid data:", data);
        }
      })
      .catch((error) => {
        console.error("エラー:", error);
      });
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "停止" : "録音開始"}
      </button>
      <div>
        {topics && topics.map((topic, index) => <p key={index}>{topic}</p>)}
      </div>
    </div>
  );
}

export default App;
