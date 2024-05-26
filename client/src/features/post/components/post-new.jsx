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

// "AudioRecorder"という関数を定義
const AudioRecorder = () => {
  //"recorder"という状態変数を作成
  //MicRecorderの新しいインスタンスを保持
  //ビットレートを128に設定してインスタンスを作成
  const [recorder] = useState(new MicRecorder({ bitRate: 128 }));
  //"isRecording"という、現在録音が進行中かどうかを示す状態変数を作成
  //初期状態はfalse、録音開始→trueに、録音停止→falseになるよう設定
  const [isRecording, setIsRecording] = useState(false);
  //"blobURL"という、文字列で、録音された音声データのURLを保持状態変数を作成
  //録音が停止されると、この状態は録音データのURLに更新される
  const [blobURL, setBlobURL] = useState("");
  //"isBlocked"という、マイクへのアクセスがブロックされているかどうかを示す状態変数を作成
  //初期状態はfalseで、マイクへのアクセスがユーザーによって拒否→trueに設定。
  const [isBlocked, setIsBlocked] = useState(false);

  const startRecording = () => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setIsBlocked(false);
        recorder
          .start()
          .then(() => {
            setIsRecording(true);
          })
          .catch((e) => console.error(e));
      },
      () => {
        console.log("Permission Denied");
        setIsBlocked(true);
      }
    );
  };

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobURL(blobURL);
        setIsRecording(false);

        // 音声データをAPIに送信するロジックをここに追加
        sendAudioData(blob);
      })
      .catch((e) => console.log(e));
  };

  const sendAudioData = (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "recording.mp3");

    fetch("YOUR_API_ENDPOINT", {
      body: formData,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // APIからのレスポンスをログに出力
        if (data.success) {
          // APIが成功のレスポンスを返す場合
          alert("音声データが正しくAPIに送信されました");
        } else {
          alert("音声データの送信に失敗しました");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "停止" : "録音開始"}
      </button>
      {/* <audio src={blobURL} controls="controls" /> */}
    </div>
  );
};

export default AudioRecorder;
