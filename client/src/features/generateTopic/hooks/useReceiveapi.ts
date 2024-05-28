// APIから受け取るデータの形を定義
interface ApiData {
  topics: string[];
}

// APIからデータを受け取る関数
async function fetchData(): Promise<ApiData> {
  const response = await fetch("http://localhost:3001/topics");
  const data: ApiData = await response.json();
  return data;
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
  const adjustedData = adjustData(data);
  return adjustedData;
}
