import base64
import io
from typing import Tuple

import numpy as np
from pydub import AudioSegment


def decode_and_resample_audio(
    base64_audio: str, target_frame_rate: int = 16000
) -> Tuple[np.ndarray, int]:
    audio_bytes = base64.b64decode(base64_audio)
    audio = io.BytesIO(audio_bytes)

    # バイト列をmp3に変換
    audio_segment = AudioSegment.from_file(audio, format="mp3")

    # サンプリングレートを変更
    resampled_audio = audio_segment.set_frame_rate(target_frame_rate)

    samples = np.array(resampled_audio.get_array_of_samples())
    return samples, resampled_audio.frame_rate
