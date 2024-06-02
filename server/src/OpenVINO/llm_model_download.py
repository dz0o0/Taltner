from datetime import datetime
import gc
import logging
import os
from pathlib import Path
from typing import Any, Tuple

from dotenv import find_dotenv, load_dotenv

# from llm_config import COMPRESSION_CONFIGS, LLM_MODELS_CONFIG
import nncf
import openvino as ov
from OpenVINO.llm_config import COMPRESSION_CONFIGS, LLM_MODELS_CONFIG
from OpenVINO.prompts.llm_prompt import SYSTEM_PROMPT
from optimum.intel.openvino import OVModelForCausalLM, OVWeightQuantizationConfig
from optimum.modeling_base import OptimizedModel

# from prompts.llm_prompt import SYSTEM_PROMPT
from transformers import AutoConfig, AutoTokenizer

# 環境変数をロード
load_dotenv(find_dotenv())

nncf.set_log_level(logging.ERROR)

print("HF_TOKEN: ", os.environ.get("HF_TOKEN", None))


def login_huggingface_hub() -> None:
    from huggingface_hub import login, whoami

    try:
        whoami()  # すでに認証済み
        print("Authorization token already provided")
    except OSError:
        try:
            login(token=os.environ.get("HF_TOKEN", None), add_to_git_credential=True)
            print("Authorization token provided")
        except ValueError:
            print("Authorization token not provided")
            print("Please provide a valid Hugging Face token to download models from the Hugging Face Hub")


core = ov.Core()

# デバイスの特定
support_devices = core.available_devices
device = "NPU" if "NPU" in support_devices else "CPU"  # 実機のNPUが使えればいいのだけれど。。。
# 動かすモデルサイズ
model_to_run = "INT8" if device == "NPU" else "INT4"  # NPUならINT8, それ以外はINT4

# ダウンロードするモデル
model_id = "microsoft/Phi-3-mini-4k-instruct" if device == "NPU" else "google/gemma-2b-it"
# model_id = "microsoft/Phi-3-mini-4k-instruct"
model_name = model_id.split("/")[-1]

remote_code = LLM_MODELS_CONFIG[model_name]["remote_code"]  # Phi-3はTrue

# モデルを保存するディレクトリ
model_dir = Path(f"../../model/{model_name}")
fp16_model_dir = model_dir / "FP16"  # float 16bitモデルの保存先
int8_model_dir = model_dir / "INT8"  # 量子化モデルの保存先(8bit)
int4_model_dir = model_dir / "INT4"  # 量子化モデルの保存先(4bit)

# optimum-cliでモデルをopenvino形式でダウンロード
ov_config = {"PERFORMANCE_HINT": "LATENCY", "NUM_STREAMS": "1", "CACHE_DIR": ""}


# ダウンロードするモデルサイズ
def download_and_convert_to_fp16() -> None:
    # モデルのダウンロード開始時間
    start_model_download = datetime.now()
    if (fp16_model_dir / "openvino_model.xml").exists():
        return
    ov_model = OVModelForCausalLM.from_pretrained(
        model_id,
        export=True,
        load_in_8bit=False,
        device=device,
        ov_config=ov_config,
        trust_remote_code=remote_code,
    )
    ov_model.half()
    ov_model.save_pretrained(fp16_model_dir)
    del ov_model
    gc.collect()
    # モデルのダウンロード終了時間
    end_model_download = datetime.now() - start_model_download
    print("export done", f"{end_model_download.total_seconds()}s")


def download_and_convert_to_int8() -> None:
    # モデルのダウンロード開始時間
    start_model_download = datetime.now()
    if (int8_model_dir / "openvino_model.xml").exists():
        return
    ov_model = OVModelForCausalLM.from_pretrained(
        model_id,
        export=True,
        load_in_8bit=True,
        device=device,
        ov_config=ov_config,
        trust_remote_code=remote_code,
    )
    ov_model.save_pretrained(int8_model_dir)
    del ov_model
    gc.collect()
    # モデルのダウンロード終了時間
    end_model_download = datetime.now() - start_model_download
    print("export done", f"{end_model_download.total_seconds()}s")


def download_and_convert_to_int4() -> None:
    # モデルのダウンロード開始時間
    start_model_download = datetime.now()
    # 量子化の設定
    if (int4_model_dir / "openvino_model.xml").exists():
        return
    model_compression_params = COMPRESSION_CONFIGS.get(model_id, COMPRESSION_CONFIGS["default"])
    ov_model = OVModelForCausalLM.from_pretrained(
        model_id,
        export=True,
        device=device,
        ov_config=ov_config,
        remote_code=remote_code,
        quantization_config=OVWeightQuantizationConfig(bits=4, **model_compression_params),
    )
    ov_model.save_pretrained(int4_model_dir)
    del ov_model
    gc.collect()
    # モデルのダウンロード終了時間
    end_model_download = datetime.now() - start_model_download
    print("export done", f"{end_model_download.total_seconds()}s")


def create_ov_model() -> Tuple[Any, OptimizedModel]:
    # cwdを現在のファイルのディレクトリに変更
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # gemma-2b-itの場合はログインが必要
    if model_name == "gemma-2b-it":
        print("Login to Hugging Face Hub")
        login_huggingface_hub()

    # モデルのダウンロード
    if model_to_run == "INT4":  # 4bitモデルを使う場合
        download_and_convert_to_int4()
        model_dir = int4_model_dir
    elif model_to_run == "INT8":  # 8bitモデルを使う場合
        download_and_convert_to_int8()
        model_dir = int8_model_dir
    elif model_to_run == "FP16":
        download_and_convert_to_fp16()
        model_dir = fp16_model_dir  # 16bitモデルを使う場合
    else:
        raise ValueError(f"Unsupported model type: {model_to_run}. Please download the model manually.")
    print(f"Loading model from {model_dir}")

    tok = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)

    # コンパイルの開始
    start = datetime.now()
    # モデルの読み込み
    ov_model = OVModelForCausalLM.from_pretrained(
        model_dir,
        device=device,
        ov_config=ov_config,
        config=AutoConfig.from_pretrained(model_dir, trust_remote_code=True),
        trust_remote_code=True,
    )

    stop = datetime.now() - start

    print(f"Model compilation completed.{stop.total_seconds()}s")

    return tok, ov_model


# AIが生成したテキスト部分のみを取得
def extract_generated_text(sys_prompt: str, decoded_answer: str) -> str:
    generated_text_ls = []
    capturing = False
    append_closure = False
    closure_text = ""

    # システムプロンプトの行数をカウント
    sys_prompt_line_num = len(sys_prompt.strip().split("\n"))
    # システムプロンプト以外の要素を取得
    lines = decoded_answer.strip().split("\n")[sys_prompt_line_num::]

    for idx, line in enumerate(lines):
        # ```jsonが見つかったら取得開始
        if "```json" in line:
            capturing = True
            continue

        # jsonが正常に終了する場合
        # ```が見つかったら取得終了
        if capturing and "```" in line:
            print("正常に終了")
            break

        if capturing:
            generated_text_ls.append(line)

        # jsonが正常に終了しない場合
        # idxが最後の行かどうかを判定。それまでに```がないなら、下記を実行
        if idx == len(lines) - 1:
            # 最後の行が'}'
            if "}" in line:
                print('最後の行が"}":  正常なJSON形式')
                append_closure = False
            # 最後の行が']'なら、最後に'\n}'を追加
            elif "]" in line:
                print('最後の行が"]":  行末に\\n}を追加')
                append_closure = True
                closure_text = "\n}"
            # 最後の行が','なら、最後に'\n]\n}'を追加
            elif line.strip().endswith(",") or line.strip().endswith('"'):
                print('最後の行が「,」か「"」:  行末に\\n  ]\\n}を追加')
                append_closure = True
                closure_text = "\n  ]\n}"
            # それ以外は'"\n]\n}'を追加
            else:
                print('最後の行がそれ以外:  行末に\\n]\\n} or "\\n]\\n}を追加')
                append_closure = True
                closure_text = '"\n  ]\n}'

    generated_text = "\n".join(generated_text_ls)

    if append_closure:
        generated_text += closure_text

    return generated_text


def generate_topic(tok: Any, ov_model: OptimizedModel, conversation: str) -> str:
    start_message = str(LLM_MODELS_CONFIG[model_name]["start_message"])
    prompt_template = str(LLM_MODELS_CONFIG[model_name]["prompt_template"])

    # プロンプトの作成
    sys_prompt = start_message.format(SYSTEM_PROMPT=SYSTEM_PROMPT)
    prompt = sys_prompt + prompt_template.format(user=conversation)

    # promptをトークン化
    input_tokens = tok(prompt, return_tensors="pt")

    # 話題の生成
    answer = ov_model.generate(**input_tokens, max_new_tokens=110, temperature=0.7, do_sample=True)
    decoded_answer = tok.batch_decode(answer, skip_special_tokens=True)[0]

    # トピックのJSON部分のみを取得
    json_topics = extract_generated_text(sys_prompt, decoded_answer)

    return json_topics


# テスト
if __name__ == "__main__":
    from datetime import datetime

    tok, ov_model = create_ov_model()

    conversation = """\
    自分「児島くんの紹介でコンテスト参加してます伊藤です」
    相手「あ、そうなんですね！！私山下と申します！AIの専攻です！」
    自分「自分はプログラマー専攻です！確かAI専攻って4年制だっけ？」
    相手「そうだよ〜。プログラマーは3年制だよね〜。短くてすぐ終わっちゃいそう」
    自分「そうなんだよね〜。でも3年目にインターンに行って実務的なこと学んで、早く就職しちゃおうと思って。」
    相手「なるほどね…!」
    自分「うちの学校正直あんまり友達がいないんだけど、学校周囲のご飯屋に友達とかと行くの？」
    相手「ぼちぼちかな。俺は一人で食べるのが好きだから、ラーメンとか食べ行くよ」
    """

    start = datetime.now()
    print("topics generation start")

    topics = generate_topic(tok, ov_model, conversation)

    stop = datetime.now() - start
    print("topics generation done", f"{stop.total_seconds()}s")

    print(topics)
