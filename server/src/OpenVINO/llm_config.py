DEFAULT_SYSTEM_PROMPT = """\
あなたは親切で、礼儀正しく、誠実なアシスタントです。\
常に安全を保ちながら、できるだけ役立つように答えてください。\
回答には、有害、非倫理的、人種差別的、性差別的、有毒、危険、または違法なコンテンツを含めてはいけません。\
回答は社会的に偏見がなく、本質的に前向きなものであることを確認してください。
質問が意味をなさない場合、または事実に一貫性がない場合は、正しくないことに答えるのではなく、その理由を説明してください。\
質問の答えがわからない場合は、誤った情報を共有しないでください。\
"""


def youri_partial_text_processor(partial_text: str, new_text: str) -> str:
    new_text = new_text.replace("システム:", "")
    partial_text += new_text
    return partial_text


LLM_MODELS_CONFIG = {
    "gemma-2b-it": {
        "model_id": "google/gemma-2b-it",
        "remote_code": False,
        "start_message": "{SYSTEM_PROMPT}, ",
        "history_template": "<start_of_turn>user{user}<end_of_turn><start_of_turn>model{assistant}<end_of_turn>",
        "current_message_template": "<start_of_turn>user{user}<end_of_turn><start_of_turn>model{assistant}",
        "prompt_template": "<start_of_turn>user{user}<end_of_turn><start_of_turn>model",
        "stop_tokens": ["<end_of_text>"],
    },
    "Phi-3-mini-4k-instruct": {
        "model_id": "microsoft/Phi-3-mini-4k-instruct",
        "remote_code": True,
        "start_message": "<|system|>\n{SYSTEM_PROMPT}<|end|>\n",
        "history_template": "<|user|>\n{user}<|end|> \n<|assistant|>\n{assistant}<|end|>\n",
        "current_message_template": "<|user|>\n{user}<|end|> \n<|assistant|>\n{assistant}",
        "prompt_template": "<|user|>\n{user}<|end|> \n<|assistant|>\n",
        "stop_tokens": ["<|end|>"],
    },
    "youri-7b-chat": {
        "model_id": "rinna/youri-7b-chat",
        "remote_code": False,
        "start_message": "設定: {SYSTEM_PROMPT}\n",
        "history_template": "ユーザー: {user}\nシステム: {assistant}\n",
        "current_message_template": "ユーザー: {user}\nシステム: {assistant}",
        "prompt_template": "ユーザー: {user}\nシステム: ",
        "tokenizer_kwargs": {"add_special_tokens": False},
        "partial_text_processor": youri_partial_text_processor,
    },
}
