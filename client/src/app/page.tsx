"use client";

import AudioRecorder from "@/features/generateTopic/components/AudioRecorder";
import { Main } from "@/features/main/components/Main";
import { Sidebar } from "@/features/main/components/Sidebar";
import { Tutorial } from "@/features/tutorial/components/Tutorial";

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-full flex-row overflow-hidden">
        <Tutorial />
        <Sidebar />
        <Main />
        {/* <AudioRecorder /> */}
      </div>
    </>
  );
}
