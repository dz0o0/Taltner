import AudioRecorder from "../features/post/components/post-new";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AudioRecorder />
      </div>
    </main>
  );
}
