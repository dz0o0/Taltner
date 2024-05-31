import React from "react";

import { Button } from "@/components/ui/button";

export function Main() {
  return (
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
        <div className="my-12 flex justify-center">
          <Button variant="destructive" className="h-12 w-32 shadow-progate">
            はじめる
          </Button>
        </div>
        <section className="mx-32 my-16 flex rounded-md bg-progateSidebarBG  shadow-progate">
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
  );
}
