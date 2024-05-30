import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useCallback, useEffect, useState } from "react";

interface CarouselProps {
  children: ReactNode[];
}

// CarouselPropsを受け取り、子要素をスライドショーとして表示するCarouselコンポーネント
const Carousel = ({ children }: CarouselProps) => {
  // 現在表示しているスライドのインデックスを管理するためのstate
  const [currentIndex, setCurrentIndex] = useState(0);

  // 次のスライドを表示する関数。現在が最後のスライドの場合は何もしない。
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? prevIndex : prevIndex + 1
    );
  }, [children.length]);

  // 前のスライドを表示する関数。現在が最初のスライドの場合は何もしない。
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  }, []);

  // キーボードの矢印キーによるスライドの切り替えを処理するためのuseEffectフック
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };

    // キーボードイベントのリスナーを追加
    window.addEventListener("keydown", handleKeyDown);

    // コンポーネントのクリーンアップ時にイベントリスナーを削除
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  return (
    <>
      {/* スライドを配置するためのフレックスコンテナ */}
      <div
        className="my-16 flex flex-row transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* 各子要素（スライド）をマップして表示 */}
        {children.map((child, index) => (
          <div
            key={index}
            className="flex size-full shrink-0 items-center justify-center"
          >
            {child}
          </div>
        ))}
      </div>
      {/* コントロール */}
      <div className="absolute bottom-10 right-12">
        {/* 前のスライドに移動するボタン */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`text-5xl text-white ${currentIndex === 0 ? "text-gray-500" : "text-gray-800 transition-colors duration-200 hover:text-slate-500"}`}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        {/* 次のスライドに移動するボタン */}
        <button
          onClick={nextSlide}
          disabled={currentIndex === children.length - 1}
          className={`ml-4 text-5xl text-white ${currentIndex === children.length - 1 ? "text-gray-500" : "text-gray-800 transition-colors duration-200 hover:text-slate-500"}`}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </>
  );
};

export default Carousel;
