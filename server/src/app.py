import json
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# ディレクトリを移動
os.chdir(os.path.dirname(os.path.abspath(__file__)))

app = FastAPI()

# オリジンの設定
origins = ["http://localhost:3000"]

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 音声認識リクエストの形式
class Audio(BaseModel):
    file: str


# 話題抽出リクエストの形式
class Transcription(BaseModel):
    transcription: str


# 会話の履歴
conversation = ""


# base64の音声データを解析し、フロントに返す
@app.post("/audio")
async def process_audio(base64_audio: Audio) -> dict[str, str]:
    # base64のヘッダーを取り除く
    base64_audio_file = base64_audio.file.split(",")[1]
    print(base64_audio_file[:20])

    # base64をデコード
    decoded_audio = "デコードした音声データ"

    # ここで音声処理を行う
    transcription = f"処理した結果({decoded_audio})"

    # 処理した結果を返す
    # 結果の形式
    """
    {
        "transcription": transcription
    }
    """
    return {"transcription": transcription}


# 音声データのSpeech To Textの内容から、話題を抽出する
@app.post("/topics")
async def extract_topics(transcription: Transcription) -> dict[str, list[str]]:
    # 会話として保存
    global conversation
    conversation += "\n" + transcription.transcription

    print("conversation", conversation)

    # ここでテキスト処理を行う

    topics = """
    {
        "topics": [
            "話題1",
            "話題2",
            "話題3",
            "話題4"
        ]
    }
    """

    # 処理した結果を返す
    json_topics: dict[str, list[str]] = json.loads(topics)

    return json_topics


if __name__ == "__main__":
    # filename: instance of str
    uvicorn.run("app:app", host="localhost", port=8080, reload=True)
