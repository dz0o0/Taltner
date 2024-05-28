import  ReceiveApi  from "../features/generateTopic/components/ReceiveApi";
import AudioRecorder from "../features/generateTopic/components/AudioRecorder";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AudioRecorder />
      </div>

      <div>
        <ReceiveApi />
      </div>
    </main>
  );
}
