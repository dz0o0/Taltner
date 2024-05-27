"use client";
// 必要なものをインポート
// mic-recorder-to-mp3ライブラリからMicRecorder(ブラウザで音声を録音するためのライブラリ)をインポート
// useStateとは・・・Reactのhooksの一つで、関数コンポーネントで状態を管理するためのもの
import MicRecorder from "mic-recorder-to-mp3";
import React, { useState } from "react";
// AudioRecorderという関数コンポーネントを定義
const AudioRecorder = () => {
  const [recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [stream, setStream] = useState(null);

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
      //apiが帰ってくるのをここに記述
  };

  const sendAudioData = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      const data = {
        file: base64data,
      };
      fetch("http://localhost:3001/audio", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("成功しました");
          } else {
            alert("失敗しました");
          }
        })
        .catch((error) => {
          console.error("エラー:", error);
        });
    };
  };

  const receiveAudioData = () => {
  };
  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "停止" : "録音開始"}
      </button>
    </div>
  );
};

export default AudioRecorder;
