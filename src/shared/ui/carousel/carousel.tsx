import { type FC, useState } from "react";
import { buttonClass } from "./lib/const";
import { Arrow } from "@/shared/ui";

type CarouselProps = {
  images: string[];
};

export const Carousel: FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? prev : prev + 1));

  if (images.length === 0) return <></>;

  return (
    <div className="grid [grid-template-areas:'stack'] w-full rounded-2xl bg-gray-900 overflow-hidden border-2 border-gray-500">
      <div
        className="[grid-area:stack] w-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            draggable={false}
            className="w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="[grid-area:stack] w-full flex justify-between opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handlePrevious}
            className={` ${buttonClass} bg-gradient-to-r justify-self-start ${
              currentIndex === 0
                ? "opacity-0 cursor-auto"
                : "opacity-70 cursor-pointer"
            }`}
          >
            <Arrow direction="left" />
          </button>

          <button
            onClick={handleNext}
            className={` ${buttonClass} bg-gradient-to-l justify-self-end ${
              currentIndex === images.length - 1
                ? "opacity-0 cursor-auto"
                : "opacity-70 cursor-pointer"
            }`}
          >
            <Arrow direction="right" />
          </button>
        </div>
      )}
    </div>
  );
};
