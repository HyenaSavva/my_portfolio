import type { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePulse } from "@/shared/hooks";
import { cn } from "@/shared/lib";

type IconCrossfadeProps = {
  activeIndex: number;
  icons: ReactNode[];
  duration?: number;
  className?: string;
  pulse?: boolean;
};

export const IconCrossfade: FC<IconCrossfadeProps> = ({
  activeIndex,
  icons,
  duration = 0.15,
  className,
  pulse = false,
}) => {
  const { scale, filter } = usePulse(activeIndex, duration);

  return (
    <motion.div className={cn("relative", className)} style={pulse ? { scale, filter } : undefined}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0.5, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.5, scale: 0.92 }}
          transition={{ duration, ease: "easeInOut" }}
        >
          {icons[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
