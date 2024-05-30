// "use client";
// import React, { useState, useEffect } from 'react';

// // APIから受け取るデータの形を定義
// const initialData = {
//   topics: []
// };

// // 配列の長さが4になるように調整する関数
// function adjustData(data) {
//   while (data && data.topics && data.topics.length < 4) {
//     data.topics.push("");
//   }
//   return data;
// }

// function ReceiveApi() {
//   const [data, setData] = useState(initialData);

//   // データを取得し、検証して表示する関数
//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch("http://localhost:3001/topics");
//       if (!response.ok) {
//         console.error(`HTTP error! status: ${response.status}`);
//         return;
//       }
//       let data = await response.json();
//       if (data && data.topics) {
//         data = adjustData(data);
//         setData(data);
//       } else {
//         console.error('Invalid data:', data);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {data && data.topics && data.topics.map((topic, index) => (
//         <p key={index}>{topic}</p>
//       ))}
//     </div>
//   );
// }

// export default ReceiveApi;
