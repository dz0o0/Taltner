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

    console.log("データが正しい形式で受け取られました。内容を表示します。"); //デバッグ用
    console.log(adjustedData.topics[0]); //デバッグ用
    console.log(adjustedData.topics[1]); //デバッグ用
    console.log(adjustedData.topics[2]); //デバッグ用
    console.log(adjustedData.topics[3]); //デバッグ用
}
