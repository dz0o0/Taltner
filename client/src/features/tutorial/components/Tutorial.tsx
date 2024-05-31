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
          className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black/70"
        >
          {/* 黒背景の内側 */}
          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute inset-4 flex bg-orange-100 text-center"
          >
            {/* スライド取り消しボタン */}
            <button
              onClick={handleClose}
              className="absolute right-8 top-6 text-3xl transition-colors duration-200 hover:text-slate-500"
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            {/* スライドショー本体 */}
            <Carousel>
              {/* スライド１枚目 */}
              <section>
                <div className="">
                  <h1 className="my-2 text-6xl tracking-tighter font-noto"><span className="font-capriola">Taltner</span>をはじめよう</h1>
                  <p className="my-3 text-center text-lg font-noto">
                    Taltnerは初対面の会話をサポートするために、自動で話題を提供します。
                    <br />
                    会話がスムーズに進むように、適切な話題を提案します。
                    <br />
                    気まずい沈黙を避け、楽しい会話をお楽しみください。
                  </p>
                </div>
                <div className="mt-[60px] h-[425px] bg-black">
                  <img className="" src="" alt=""></img>
                </div>
              </section>
              {/* スライド2枚目 */}
              <section>
                <div className="">
                  <h1 className="my-2 text-6xl tracking-tighter font-noto">会話の音声を録画しよう</h1>
                  <p className="my-3 text-center text-lg font-noto">
                    会話の音声を録音します。<br />
                    相手に録音の通知がいくことがないため、<br />
                    このアプリを使用していることはバレません。<br />
                  </p>
                </div>
                <div className="mt-[60px] h-[425px] bg-black">
                  <img className="" src="" alt=""></img>
                </div>
              </section>
              {/* スライド3枚目 */}
              <section>
                <div className="">
                  <h1 className="my-2 text-6xl tracking-tighter font-noto ">話題を表示してみよう</h1>
                  <p className="my-3 text-center text-lg font-noto">
                    「話題を表示」を押すと、録音した会話を元に話題が表示されます。<br />
                    適当な話題ではなく、会話に沿った話題が表示されるため<br />
                    話題に困る事なく会話を楽しむことができます。
                  </p>
                </div>
                <div className="mt-[60px] h-[425px] bg-black">
                  <img className="" src="" alt=""></img>
                </div>
              </section>
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
}
