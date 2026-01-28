import { useState, type FC, type SyntheticEvent } from "react";
import { cn } from "@/shared/lib";

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  modal?: boolean;
}

export const Image: FC<ImageProps> = ({ src, alt = "", className, modal }) => {
  const [loaded, setLoaded] = useState(false);
  const [vertical, setVertical] = useState(false);

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setVertical(naturalHeight > naturalWidth);
    setLoaded(true);
  };

  return (
    <div className={cn("relative overflow-hidden bg-white/5", modal ? "aspect-[3/4] sm:aspect-video" : "aspect-video", className)}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/10" />}

      {vertical && (
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
        />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        className={cn(
          "transition-opacity duration-300",
          vertical
            ? "absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto"
            : "absolute inset-0 w-full h-full object-cover",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};
