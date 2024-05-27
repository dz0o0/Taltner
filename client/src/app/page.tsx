import AudioRecorder from "../features/generateTopic/components/post-new";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AudioRecorder />
      </div>
    </main>
  );
}
