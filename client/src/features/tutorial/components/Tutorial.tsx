import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import Carousel from "@/features/tutorial/components/Carousel";

export function Tutorial() {
  // 状態変数とその更新関数を定義します。初期値はtrueです。
  const [isOpen, setIsOpen] = useState(true);

  // handleOpen関数は、isOpenの状態をtrueに設定します。
  const handleOpen = () => {
    setIsOpen(true);
  };

  // handleClose関数は、isOpenの状態をfalseに設定します。
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        // 黒背景
        <div
          onClick={handleClose}
          className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black opacity-70"
        >
          {/* 黒背景の内側 */}
          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute inset-4 flex bg-slate-300"
          >
            {/* スライド取り消しボタン */}
            <button
              onClick={handleClose}
              className="absolute right-8 top-6 text-3xl transition-colors duration-100 hover:text-slate-500"
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            {/* スライドショー本体 */}
            <Carousel>
              <section>
                <h1 className="text-5xl">Taltnerをはじめよう</h1>
              </section>
              <section>
                <h1 className="text-5xl">ボタンをクリックで喋ってみよう</h1>
              </section>
              <section>
                <h1 className="text-5xl">ボタンをクリックで送信してみよう</h1>
              </section>
              <section>
                <h1 className="text-5xl">話題を選択してみよう</h1>
              </section>
              <section>
                <h1 className="text-5xl">音声の入力は許可しているかな？</h1>
              </section>
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
}
