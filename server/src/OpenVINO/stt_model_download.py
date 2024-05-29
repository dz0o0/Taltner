# import ipywidgets as widgets
from datetime import datetime
import os
from pathlib import Path

from decode_base64_audio import decode_and_resample_audio
import openvino as ov
from optimum.intel.openvino import OVModelForSpeechSeq2Seq
from optimum.modeling_base import OptimizedModel
from transformers import AutoProcessor, pipeline
from transformers.pipelines import Pipeline

# cwdを現在のファイルのディレクトリに変更
os.chdir(os.path.dirname(os.path.abspath(__file__)))

core = ov.Core()
# デバイスの選択
device = "NPU" if "NPU" in core.available_devices else "CPU"

# テストで使うモデル
model_id = "openai/whisper-large-v3"
model_name = model_id.split("/")[1]

# クラスからモデルを読み込む

# モデルを保存するディレクトリ
model_dir = Path(f"../../model/{model_name}")
fp16_model_dir = model_dir / "FP16"  # float 16bitモデルの保存先
int8_model_dir = model_dir / "INT8"  # 量子化モデルの保存先(8bit)

ov_config = {"CACHE_DIR": ""}


def download_and_convert_to_fp16() -> OptimizedModel:
    # ダウンロード開始
    start_model_download = datetime.now()
    if not (fp16_model_dir / "openvino_encoder_model.xml").exists():
        ov_model = OVModelForSpeechSeq2Seq.from_pretrained(
            model_id,
            ov_config=ov_config,
            export=True,
            compile=False,
            load_in_8bit=False,
        )
        ov_model.half()
        ov_model.save_pretrained(fp16_model_dir)
    else:
        ov_model = OVModelForSpeechSeq2Seq.from_pretrained(
            fp16_model_dir, ov_config=ov_config, compile=False
        )
    # ダウンロード完了
    end_model_download = datetime.now() - start_model_download
    print("export done", end_model_download.total_seconds())
    return ov_model


def download_and_convert_to_int8() -> OptimizedModel:
    # ダウンロード開始
    start_model_download = datetime.now()
    if not (int8_model_dir / "openvino_encoder_model.xml").exists():
        ov_model = OVModelForSpeechSeq2Seq.from_pretrained(
            model_id,
            ov_config=ov_config,
            export=True,
            compile=False,
            load_in_8bit=True,
        )
        ov_model.save_pretrained(int8_model_dir)
    else:
        ov_model = OVModelForSpeechSeq2Seq.from_pretrained(
            int8_model_dir, ov_config=ov_config, compile=False
        )
    # ダウンロード完了
    end_model_download = datetime.now() - start_model_download
    print("export done", end_model_download.total_seconds())
    return ov_model


def get_stt_pipeline() -> Pipeline:
    # deviceがNPUならFP16, それ以外はINT8
    ov_model = (
        download_and_convert_to_fp16()
        if device == "NPU"
        else download_and_convert_to_int8()
    )
    ov_model.to(device)
    ov_model.compile()

    processor = AutoProcessor.from_pretrained(model_id)

    # 音声認識のパイプラインの設定
    pipe = pipeline(
        "automatic-speech-recognition",
        model=ov_model,
        tokenizer=processor.tokenizer,
        feature_extractor=processor.feature_extractor,
        max_new_tokens=256,  # 要変更
        chunk_length_s=25,  # 要変更
    )

    # 日本語の音声認識のための設定
    pipe.model.config.forced_decoder_ids = pipe.tokenizer.get_decoder_prompt_ids(
        language="Japanese",
        task="transcribe",  # "translate"(翻訳) or "transcribe"(音声認識)
    )

    return pipe


def transcribe_audio(base64_audio: str, pipe: Pipeline) -> str:
    # base64をデコードしてリサンプリング(16000Hz)
    audio, _ = decode_and_resample_audio(base64_audio)

    print("transcribing start")
    result = str(pipe(audio)["text"])
    print("transcribing end")

    return result


if __name__ == "__main__":
    pipe = get_stt_pipeline()

    with open("audio/base64_audio_test.txt", "r") as f:
        base64_audio = f.read()

    # base64のヘッダを削除, 必須の前処理
    base64_audio = base64_audio.split(",")[1]
    # 音声認識の実行
    result = transcribe_audio(base64_audio, pipe)

    print(result)
