"use client";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/features/main/components/Accordion";
import { Tutorial } from "@/features/tutorial/components/Tutorial";

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-full flex-row overflow-hidden">
        <Tutorial />
        <Sidebar />
        <div className="flex h-full max-w-full flex-1 flex-col overflow-hidden">
          <main className="size-full flex-1 overflow-auto bg-progateBaseBG">
            {/* アプリ名とキャッチコピー */}
            <div className="mt-24 flex flex-col items-center justify-center">
              <h1 className="font-capriola text-5xl">Taltner</h1>
              <p className="font-noto  text-2xl">
                Let&apos; s have a conversation.
              </p>
            </div>
            {/* マイクボタン */}
            <div className="flex justify-center my-12">
              <Button
                variant="destructive"
                className="w-32 h-12 shadow-progate"
              >
                はじめる
              </Button>
            </div>
            <section className="mx-32 my-26 flex rounded-md bg-progateSidebarBG  shadow-progate">
              <div className="grid size-full grid-cols-2 gap-16 p-24">
                <Button variant="default" className="h-24 shadow-progate">
                  <p className="font-noto text-base">今日のご飯はなんですか</p>
                </Button>
                <Button variant="default" className="h-24 shadow-progate">
                  <p className="font-noto text-base">昨日何時に寝ましたか</p>
                </Button>
                <Button variant="default" className="h-24 shadow-progate">
                  <p className="font-noto text-base">明日の予定はなんですか</p>
                </Button>
                <Button variant="default" className="h-24 shadow-progate">
                  <p className="font-noto text-base">
                    好きなアーティストは誰ですか
                  </p>
                </Button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
