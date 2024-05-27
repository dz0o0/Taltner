from datetime import datetime
import logging
import os
from pathlib import Path

from llm_config import LLM_MODELS_CONFIG
import nncf
import openvino as ov

nncf.set_log_level(logging.ERROR)


## modelがgemmaの場合は、ログインが必要
def login_huggingface_hub() -> None:
    from huggingface_hub import login, whoami

    try:
        whoami()
        print("Authorization token already provided")
    except OSError:
        try:
            login(token=os.environ.get("HF_TOKEN"), add_to_git_credential=True)
            print("Authorization token provided")
        except ValueError:
            print("Authorization token not provided")
            print("Please provide a valid Hugging Face token to download models from the Hugging Face Hub")


core = ov.Core()

# デバイスの特定
support_devices = core.available_devices
device = "NPU" if "NPU" in support_devices else "CPU"  # 実機のNPUが使えればいいのだけれど。。。

# ダウンロードするモデル
model_id = "microsoft/Phi-3-mini-4k-instruct" if device == "NPU" else "google/gemma-2b-it"

# 一旦テストでPhi-3-mini-4k-instructを使う
# model_id = "microsoft/Phi-3-mini-4k-instruct"

## modelがgemmaの場合は、HuggingFaceのログインが必要
if model_id == "google/gemma-2b-it":
    login_huggingface_hub()

model_name = model_id.split("/")[-1]

remote_code = LLM_MODELS_CONFIG[model_name]["remote_code"]  # Phi-3はTrue

# モデルを保存するディレクトリ
model_dir = Path(f"../../model/{model_name}")
fp16_model_dir = model_dir / "FP16"  # float 16bitモデルの保存先
int8_model_dir = model_dir / "INT8"  # 量子化モデルの保存先(8bit)
int4_model_dir = model_dir / "INT4"  # 量子化モデルの保存先(4bit)


# INT4の設定
compression_configs = {
    # ここのパラメータは要調整
    # "sym":          対称量子化の利用
    # 'group_size':  グループサイズ  (64, 128が無難？)
    # 'ratio':       量子化後のパラメータの割合  (0.5~0.8で試す)
    "gemma-2b-it": {
        "sym": True,
        "group_size": 64,
        "ratio": 0.6,
    },
    "default": {
        "sym": False,
        "group_size": 128,
        "ratio": 0.8,
    },
}

# optimum-cliでモデルをopenvino形式でダウンロード
export_command_base = "optimum-cli export openvino --model {} --task text-generation-with-past".format(model_id)


def convert_to_fp16() -> None:
    global export_command_base
    export_command = ""
    # すでに存在する場合はスキップ
    if (fp16_model_dir / "openvino_model.xml").exists():
        return
    if remote_code:
        # Phi-3のみ
        export_command_base += " --trust-remote-code"
    export_command = export_command_base + " --weight-format fp16"
    export_command += " " + str(fp16_model_dir)
    # モデルのダウンロード開始時間
    start_model_download = datetime.now()
    print("export_command:", export_command)
    os.system(export_command)  # モデルのダウンロード
    # モデルのダウンロード終了時間
    end_model_download = datetime.now() - start_model_download
    print("export done", end_model_download.total_seconds())


def convert_to_int8() -> None:
    global export_command_base
    if (int8_model_dir / "openvino_model.xml").exists():
        return
    if remote_code:
        export_command_base += " --trust-remote-code"
    export_command = export_command_base + " --weight-format int8"
    export_command += " " + str(int8_model_dir)
    # モデルのダウンロード開始時間
    start_model_download = datetime.now()
    print("export_command:", export_command)
    os.system(export_command)  # モデルのダウンロード
    # モデルのダウンロード終了時間
    end_model_download = datetime.now() - start_model_download
    print("export done", end_model_download.total_seconds())


def convert_to_int4() -> None:
    global export_command_base
    if (int4_model_dir / "openvino_model.xml").exists():
        return
    if remote_code:
        export_command_base += " --trust-remote-code"
    # 量子化の設定
    model_compression_params = compression_configs.get(model_name, compression_configs["default"])
    export_command = export_command_base + " --weight-format int4"
    int4_compression_args = " --group-size {} --ratio {}".format(
        model_compression_params["group_size"], model_compression_params["ratio"]
    )
    if model_compression_params["sym"]:
        int4_compression_args += " --sym"
    export_command += int4_compression_args + " " + str(int4_model_dir)
    # モデルのダウンロード開始時間
    start_model_download = datetime.now()
    print("export_command:", export_command)
    os.system(export_command)  # モデルのダウンロード
    # モデルのダウンロード終了時間
    end_model_download = datetime.now() - start_model_download
    print("export done", end_model_download.total_seconds())


def download_model() -> None:
    print(f"Downloading model {model_name}...")
    # deviceがNPUならINT8, それ以外はINT4
    convert_to_int8() if device == "NPU" else convert_to_int4()
    # convert_to_fp16()


# モデルが保存されているディレクトリのサイズを確認

fp16_weights = fp16_model_dir / "openvino_model.bin"
int8_weights = int8_model_dir / "openvino_model.bin"
int4_weights = int4_model_dir / "openvino_model.bin"

if fp16_weights.exists():
    print(f"Size of FP16 model is {fp16_weights.stat().st_size / 1024 / 1024:.2f} MB")

# ファイルのサイズを確認
for precision, compressed_weights in zip([8, 4], [int8_weights, int4_weights], strict=True):
    if compressed_weights.exists():
        print(
            f"Size of model with INT{precision} compressed weights is \
            {compressed_weights.stat().st_size / 1024 / 1024:.2f} MB"
        )
    if compressed_weights.exists() and fp16_weights.exists():
        print(
            f"Compression rate for INT{precision} model:\
            {fp16_weights.stat().st_size / compressed_weights.stat().st_size:.3f}"
        )
