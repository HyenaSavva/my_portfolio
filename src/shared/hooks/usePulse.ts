import { useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

type UsePulseOptions = {
  /** Scale at midpoint (default: 0.9) */
  minScale?: number;
  /** Blur at midpoint in px (default: 2) */
  maxBlur?: number;
};

/**
 * Creates a "pulse" effect: scale and blur during transition
 * 1 -> minScale -> 1 for scale
 * 0 -> maxBlur -> 0 for blur
 */
export const usePulse = (
  activeIndex: number,
  duration: number,
  options: UsePulseOptions = {}
) => {
  const { minScale = 0.9, maxBlur = 2 } = options;

  const progress = useMotionValue(0);
  const prevIndex = useRef(activeIndex);

  const scale = useTransform(progress, [0, 0.5, 1], [1, minScale, 1]);
  const blur = useTransform(progress, [0, 0.5, 1], [0, maxBlur, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  useEffect(() => {
    if (prevIndex.current !== activeIndex) {
      progress.set(0);
      animate(progress, 1, { duration, ease: "easeInOut" });
      prevIndex.current = activeIndex;
    }
  }, [activeIndex, duration, progress]);

  return { scale, blur, filter };
};
