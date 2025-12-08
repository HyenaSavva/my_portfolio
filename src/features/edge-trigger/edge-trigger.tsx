import type { FC } from "react";
import { motion } from "motion/react";
import { cn } from "@/shared/lib";

type EdgeTriggerProps = {
  onTrigger: () => void;
  side?: "left" | "right";
  className?: string;
  alwaysVisible?: boolean;
};

export const EdgeTrigger: FC<EdgeTriggerProps> = ({ onTrigger, side = "left", className, alwaysVisible = false }) => {
  const isLeft = side === "left";

  return (
    <motion.div
      onClick={onTrigger}
      className={cn(
        "fixed top-0 bottom-0 w-4 z-40 cursor-pointer group touch-manipulation",
        isLeft ? "left-0" : "right-0",
        className,
      )}
      initial="idle"
      whileHover="hover"
      whileTap="hover"
    >
      {/* Indicator bar */}
      <motion.div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 h-20 w-1 rounded-full bg-gray-500",
          isLeft ? "left-1" : "right-1",
        )}
        variants={{
          idle: { opacity: alwaysVisible ? 0.5 : 0, scaleY: alwaysVisible ? 0.8 : 0.5 },
          hover: { opacity: 1, scaleY: 1 },
        }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  );
};
