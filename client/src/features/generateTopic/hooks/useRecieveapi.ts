// 全体：apiを受け取った場合の処理の作成をTypescriptで行う;
// 1.apiから送られてくるjsonデータの形を指定(以下のようにtopicsというキーに入ってっている配列が4つのみ、4つ以外はアウト)
// {
//     "topics": [
//         "AIやプログラミングの最新トレンド",
//         "インターンでの経験",
//         "学校と学際的な活動",
//         "季節のラーメンのおすすめ"
//     ]
// }
// 2.apiでバックエンド側からjsonデータが送られてくる
// 3.受け取ったjsonデータが1に反している場合再リクエストを送る
// 4.受け取ったデータが1に反していない場合、内容を画面に表示する

// APIから受け取るデータの形を定義
interface ApiData {
  topics: string[];
}

// APIからデータを受け取る関数
async function fetchData(): Promise<ApiData> {
  const response = await fetch("apiのURL");
  const data: ApiData = await response.json();
  return data;
}

// データが正しい形式であるかを検証する関数
function validateData(data: ApiData): boolean {
    return Array.isArray(data.topics);
  }

  // 配列の長さが4になるように調整する関数
  function adjustData(data: ApiData): ApiData {
    while (data.topics.length < 4) {
      data.topics.push("");
    }
    return data;
  }

  // データを取得し、検証して表示する関数
  async function displayData() {
    const data = await fetchData();

    if (!validateData(data)) {
      return;
    }

    const adjustedData = adjustData(data);

    console.log("データが正しい形式で受け取られました。内容を表示します。"); //デバッグ用
    console.log(adjustedData.topics); //デバッグ用
}
