import type { FC } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTooltip } from "./tooltip-context";
import { cn } from "@/shared/lib";

export const FloatingTooltip: FC = () => {
  const { tooltipData, position, isVisible } = useTooltip();

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 25 },
        y: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.15, ease: "easeOut" },
      }}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        transform: "translateX(-50%) translateY(-100%)",
        zIndex: "var(--z-top)",
        pointerEvents: "none",
      }}
      className={cn("px-3 py-2 rounded-lg ", "bg-gray-900/95 backdrop-blur-sm border border-gray-700", "shadow-lg")}
    >
      <AnimatePresence mode="wait">
        {tooltipData && (
          <motion.div
            key={tooltipData.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="transition-transform"
          >
            <p className="text-sm font-bold text-white whitespace-nowrap">{tooltipData.name}</p>
            <p className="text-xs text-gray-400 whitespace-nowrap">{tooltipData.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
