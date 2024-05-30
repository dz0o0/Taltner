"use client";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/features/main/components/Accordion";
import { Tutorial } from "@/features/tutorial/components/Tutorial";

export default function Home() {
  useEffect(() => {
    // ビューポートの高さを設定する関数
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // 初期のビューポートの高さを設定
    setVh();

    // ウィンドウのリサイズイベントに応じてビューポートの高さを更新
    window.addEventListener("resize", setVh);

    // コンポーネントがアンマウントされたときにイベントリスナーを削除
    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  return (
    <div className="flex h-screen w-full flex-row bg-progateBaseBG">
      <Tutorial />
      {/*
        サイドバー
        width chatGPTのサイドバーが２６０pxで指定していたためそこからの引用
      */}
      <aside className="h-screen w-[260px] overflow-y-scroll border-r-2 border-r-progateSidebarBorder bg-progateSidebarBG p-4 pt-32 text-black ">
        <Sidebar />
      </aside>

      {/*
        メイン画面
      */}
      <main className="w-full overflow-hidden">
        <div className="mt-32 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-noto">Taltner</h1>
          <p className="text-2xl">Let&apos; s have a conversation.</p>
        </div>
        <section className="mx-32 my-16 rounded-md bg-white shadow-progate">
          <div className="grid size-full grid-cols-2 gap-24 p-24">
            <Button variant="default" className="h-24 shadow-progate">
              <p className="text-base">今日のご飯はなんですか</p>
            </Button>
            <Button variant="default" className="h-24 shadow-progate">
              <p className="text-base">昨日何時に寝ましたか</p>
            </Button>
            <Button variant="default" className="h-24 shadow-progate">
              <p className="text-base">明日の予定はなんですか</p>
            </Button>
            <Button variant="default" className="h-24 shadow-progate">
              <p className="text-base">好きなアーティストは誰ですか</p>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
