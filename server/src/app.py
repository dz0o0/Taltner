import json
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from OpenVINO.llm_model_download import create_ov_model, generate_topic
from OpenVINO.stt_model_download import get_stt_pipeline, transcribe_audio
from pydantic import BaseModel
import uvicorn

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

# STTのモデルを取得
stt_pipe = get_stt_pipeline()

# LLMのモデルを取得
llm_tok, llm_ov_model = create_ov_model()

# ディレクトリを移動
os.chdir(os.path.dirname(os.path.abspath(__file__)))


# base64の音声データを解析し、フロントに返す
@app.post("/audio")
async def process_audio(base64_audio: Audio) -> dict[str, str]:
    """
    base64の音声データを解析し、解析したテキストデータを返す
    :param base64_audio Audio: base64の音声データ

    :return dict[str, str]:
        {
            "transcription": transcription
        }
    """
    # base64のヘッダーを取り除く
    base64_audio_file = base64_audio.file.split(",")[1]
    print(base64_audio_file[:20])

    # base64をデコードし、音声処理を行う
    transcription = transcribe_audio(base64_audio_file, stt_pipe)

    return {"transcription": transcription}


# 音声データのSpeech To Textの内容から、話題を抽出する
@app.post("/topics")
async def extract_topics(transcription: Transcription) -> dict[str, list[str]]:
    """
    STTの内容から、LLMで話題を抽出し、JSON形式で返す
    :param transcription Transcription: STTの内容

    :return dict[str, list[str]]:
        {
            "topics": [
                "話題1",
                "話題2",
                "話題3",
                "話題4"
            ]
        }
    """

    # 会話として保存
    global conversation
    conversation += "\n" + transcription.transcription
    print("conversation", conversation)

    # ここでテキスト処理を行う
    topics = generate_topic(llm_tok, llm_ov_model, conversation)

    # 処理した結果をJSONに変換し、返す
    json_topics: dict[str, list[str]] = json.loads(topics)

    print(json_topics)

    return json_topics


if __name__ == "__main__":
    # filename: instance of str
    uvicorn.run("app:app", host="localhost", port=8080, reload=True)
