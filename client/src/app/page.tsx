"use client";

import { Tutorial } from "@/features/tutorial/components/Tutorial";
import  ReceiveApi  from "../features/generateTopic/components/ReceiveApi";
import AudioRecorder from "../features/generateTopic/components/AudioRecorder";

export default function Home() {
  return (
    <div className="">
      <Tutorial />
      <AudioRecorder />
      <ReceiveApi />
    </div>
  );
}
