import { useEffect } from "react";
import { useSpring, useMotionValue } from "motion/react";

export const usePulse = (trigger: number, duration = 0.15) => {
  const scale = useMotionValue(1);
  const filter = useMotionValue("brightness(1)");

  const springScale = useSpring(scale, { stiffness: 400, damping: 20 });

  useEffect(() => {
    scale.set(1.15);
    filter.set("brightness(1.3)");

    const timeout = setTimeout(() => {
      scale.set(1);
      filter.set("brightness(1)");
    }, duration * 1000);

    return () => clearTimeout(timeout);
  }, [trigger, duration, scale, filter]);

  return { scale: springScale, filter };
};
