//mic-recorder-to-mp3ライブラリを使って音声をファイルに録音し、そのファイルをAPIで送信する
//録音ボタンとストップボタンをgetElementByIdで認識
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
//音声ボタンが押された際に録音開始
recordButton.addEventListener('click', () => {
  // マイクへのアクセスを許可し、録音を開始
  recorder.start().then(() => {
      recordButton.disabled = true;
      stopButton.disabled = false;
  }).catch((e) => {
      console.error(e);
      alert('Could not start recording. Please make sure you have granted microphone access.');
  });
});
//音声ボタンをもう一度押す
//録音停止
//音声ファイルをMP3形式で作成
//音声ファイルをAPIで送信する


