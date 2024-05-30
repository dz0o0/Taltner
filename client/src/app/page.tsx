"use client";
import { useEffect } from "react";
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
    <div className="flex flex-row w-full h-screen bg-progateBaseBG">
      <Tutorial />
      {/*
        サイドバー
        width chatGPTのサイドバーが２６０pxで指定していたためそこからの引用
      */}
      <aside className="h-screen w-[260px] border-r-2 border-r-progateSidebarBorder bg-progateSidebarBG p-4 pt-32 text-black overflow-y-scroll ">
        <Sidebar />
      </aside>

      {/*
        メイン画面
      */}
      <main className="w-full overflow-hidden">
        <div className="mt-32 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold">Taltner</h1>
          <p className="text-2xl">Let's have a conversation.</p>
        </div>
        <section className="my-16 mx-32">
          <div className="bg-slate-300 w-full h-full">
            <div>aaa</div>
          </div>
        </section>
      </main>
      {/* <main className="">
        <div className="">
          <h1 className="mt-32 text-5xl font-bold">Taltner</h1>
          <p className="text-2xl">Let's have a conversation.</p>
        </div>
        <section className="size-full mb-32 mt-16 mx-64 bg-black"></section>
      </main> */}
    </div>
  );
}
