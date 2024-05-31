import React from "react";

import { Button } from "@/components/ui/button";

import { TalkChoice } from "./TalkChoice";

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
        <TalkChoice />
      </main>
    </div>
  );
}
