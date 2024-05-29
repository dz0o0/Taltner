import  ReceiveApi  from "../features/generateTopic/components/ReceiveApi";
import AudioRecorder from "../features/generateTopic/components/AudioRecorder";
import { Tutorial } from "@/features/tutorial/components/Tutorial";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AudioRecorder />
      </div>

      <div>
        <ReceiveApi />
      </div>
      <div className="">
      <Tutorial />
      </div>
    </main>
  );
}
