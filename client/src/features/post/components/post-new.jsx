"use client";
//録音開始ボタンを識別
//録音開始ボタンを押す
//マイクの許可を確認
//マイクが許可されていない場合、アラートを表示
//マイクが許可されている場合、録音を開始
//録音ボタンを停止ボタンに変更
//録音データを定期的に取得して送信（タイマーを設定）
//音声データをAPIに送信

//停止ボタンを押す
//録音を停止
//録音データの送信を停止
//停止ボタンを録音ボタンに変更

// 必要なものをインポート
// useStateとは・・・Reactのhooksの一つで、関数コンポーネントで状態を管理するためのもの
// useEffectとは・・・Reactのhooksの一つで、関数コンポーネントで副作用を実行するためのもの
// mic-recorder-to-mp3ライブラリからMicRecorder(ブラウザで音声を録音するためのライブラリ)をインポート
import MicRecorder from "mic-recorder-to-mp3";
import React, { useState } from "react";

const AudioRecorder = () => {
  const [recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [stream, setStream] = useState(null); // マイクストリームの状態変数

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Permission Granted");
        setIsBlocked(false);
        setStream(stream); // ストリームを状態に保存
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
    console.log("Stopping recording...");
    try {
      const [buffer, blob] = await recorder.stop().getMp3();
      const blobURL = URL.createObjectURL(blob);
      setBlobURL(blobURL);
      setIsRecording(false);
      console.log("Recording stopped.");

      // ストリームを停止
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null); // ストリームをクリア
      }

      sendAudioData(blob);
    } catch (e) {
      console.error("Error stopping recording:", e);
    }
  };

  const sendAudioData = (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "recording.mp3");

    fetch("http://localhost:3001/audio/1", {
      body: formData,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log("音声データが正しくAPIに送信されました");
        } else {
          console.log("音声データの送信に失敗しました");
        }
      })
      .catch((error) => console.error("Error:", error));
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
