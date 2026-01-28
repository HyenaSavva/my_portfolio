import { type FC, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { cn } from "@/shared/lib";
import { Image } from "../image/image";
import { Video } from "../video/video";
import { MediaModal } from "../media-modal";

// @ts-expect-error swiper styles
import "swiper/css";

interface CarouselProps {
  media: MediaItem[];
}

export const Carousel: FC<CarouselProps> = ({ media }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [modalMedia, setModalMedia] = useState<MediaItem | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setIsFirst(swiper.realIndex === 0);

    const currentMedia = media[swiper.realIndex];
    if (currentMedia?.type === "video") {
      swiper.autoplay?.stop();
    } else {
      swiper.autoplay?.start();
    }
  };

  if (media.length === 0) return null;

  const canNavigate = media.length > 1;

  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop={canNavigate}
        grabCursor
        className="w-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
      >
        {media.map((item, i) => (
          <SwiperSlide key={i}>
            <div onClick={() => setModalMedia(item)} className="cursor-zoom-in">
              {item.type === "video" ? <Video src={item.src} preview /> : <Image src={item.src} />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      {canNavigate && (
        <>
          <NavButton direction="prev" onClick={() => swiperRef.current?.slidePrev()} />
          <NavButton direction="next" onClick={() => swiperRef.current?.slideNext()} />
          <Dots total={media.length} active={activeIndex} onDotClick={(i) => swiperRef.current?.slideToLoop(i)} />
        </>
      )}

      {/* Scroll hint on first slide */}
      {canNavigate && isFirst && (
        <div className="absolute inset-y-0 right-0 w-16 pointer-events-none overflow-hidden">
          <div className="absolute inset-y-0 w-full bg-linear-to-l from-white/20 to-transparent animate-[slide_1.5s_ease-in-out_infinite]" />
        </div>
      )}

      <MediaModal media={modalMedia} onClose={() => setModalMedia(null)} />
    </div>
  );
};

// Navigation Button
type NavButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
};

const NavButton: FC<NavButtonProps> = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "absolute top-1/2 -translate-y-1/2 z-10 p-2",
      "bg-black/30 backdrop-blur-sm rounded-full",
      "text-white/70 hover:text-white hover:bg-black/50",
      "transition-all duration-200",
      direction === "prev" ? "left-3" : "right-3",
    )}
  >
    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "prev" ? "M15.75 19.5L8.25 12l7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5"}
      />
    </svg>
  </button>
);

// Dots Indicator
type DotsProps = {
  total: number;
  active: number;
  onDotClick: (index: number) => void;
};

const Dots: FC<DotsProps> = ({ total, active, onDotClick }) => (
  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 bg-black/40 px-2 py-1 rounded-full">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onDotClick(i)}
        className={cn(
          "size-2 rounded-full transition-all duration-300",
          i === active ? "bg-white w-4" : "bg-white/40 hover:bg-white/60",
        )}
      />
    ))}
  </div>
);
