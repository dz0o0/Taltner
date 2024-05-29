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
        className="m-16 flex flex-row transition-transform duration-500"
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
      <div className="absolute bottom-6 right-8">
        {/* 前のスライドに移動するボタン */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`-translate-y-1/2 rounded-full p-2 text-white ${currentIndex === 0 ? "bg-gray-500" : "bg-gray-800"}`}
        >
          &#8249;
        </button>
        {/* 次のスライドに移動するボタン */}
        <button
          onClick={nextSlide}
          disabled={currentIndex === children.length - 1}
          className={`-translate-y-1/2 rounded-full p-2 text-white ${currentIndex === children.length - 1 ? "bg-gray-500" : "bg-gray-800"}`}
        >
          &#8250;
        </button>
      </div>
    </>
  );
};

export default Carousel;
