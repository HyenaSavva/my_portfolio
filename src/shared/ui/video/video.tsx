import type { FC, SyntheticEvent, MouseEvent } from "react";
import { useState, useRef } from "react";
import { cn } from "@/shared/lib";

interface VideoProps {
  src: string;
  className?: string;
  preview?: boolean;
  modal?: boolean;
}

export const Video: FC<VideoProps> = ({ src, className, preview, modal }) => {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleLoadedMetadata = (e: SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = e.currentTarget;
    setVertical(videoHeight > videoWidth);
    setLoaded(true);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    setProgress((currentTime / duration) * 100);
  };

  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * videoRef.current.duration;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white/5 group",
        modal ? "aspect-3/4 sm:aspect-video" : "aspect-video",
        className,
      )}
    >
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/10" />}

      {vertical && (
        <video src={src} muted className="absolute inset-0 size-full object-cover blur-2xl scale-110 opacity-60" />
      )}

      <video
        ref={videoRef}
        src={src}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPlaying(false)}
        className={cn(
          "transition-opacity duration-300",
          vertical
            ? "absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto"
            : "absolute inset-0 w-full h-full object-cover",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />

      {preview ? (
        <div className="absolute inset-0 center">
          <div className="center size-16 rounded-full bg-white/20 backdrop-blur-sm">
            <PlayIcon />
          </div>
        </div>
      ) : (
        <>
          <button onClick={togglePlay} className="absolute inset-0 center">
            <div
              className={cn(
                "center size-16 rounded-full bg-white/20 backdrop-blur-sm transition-opacity cursor-pointer",
                playing ? "opacity-0" : "opacity-100",
              )}
            >
              <PlayIcon />
            </div>
          </button>

          {/* Progress bar */}
          <div
            className={cn(
              "absolute bottom-1 left-2 right-2 px-2 py-1 rounded-full bg-black/80 transition-all",
              playing ? "translate-y-10 group-hover:translate-y-0" : "translate-y-0",
            )}
          >
            <div ref={progressRef} onClick={handleSeek} className="h-2 bg-white/20 rounded-full cursor-pointer">
              <div
                className="h-full bg-white/80 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const PlayIcon = () => (
  <svg className="size-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);
