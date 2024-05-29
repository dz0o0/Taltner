import { ReactNode, useState } from "react";

interface CarouselProps {
  children: ReactNode[];
}

const Carousel = ({ children }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

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
          className="-translate-y-1/2 rounded-full bg-gray-800 p-2 text-white"
        >
          &#8249;
        </button>
        {/* 次のスライドに移動するボタン */}
        <button
          onClick={nextSlide}
          className="-translate-y-1/2 rounded-full bg-gray-800 p-2 text-white"
        >
          &#8250;
        </button>
      </div>
    </>
  );
};

export default Carousel;
