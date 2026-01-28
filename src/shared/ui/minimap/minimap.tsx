import { type FC } from "react";
import { motion } from "motion/react";
import { useActiveSection } from "@/shared/hooks/use-active-section";
import { useIsDesktop } from "@/shared/hooks/use-media-query";
import { cn } from "@/shared/lib";

type MinimapProps = {
  items: string[];
};

export const Minimap: FC<MinimapProps> = ({ items }) => {
  const activeId = useActiveSection(items);
  const isDesktop = useIsDesktop();

  if (!items.length || !isDesktop) return null;

  const activeIndex = Math.max(0, items.indexOf(activeId));

  const getStyle = (index: number) => {
    const distance = Math.abs(index - activeIndex);

    if (distance === 0) return "scale-250 -translate-x-1.5 bg-white";
    if (distance === 1) return "scale-125 -translate-x-0.5 bg-gray-600";
    return "scale-100 translate-x-0 bg-gray-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-(--z-above) flex-col gap-3"
    >
      {items.map((id, index) => (
        <button
          key={id}
          onClick={() =>
            document
              .querySelector(`[data-experience-id="${id}"]`)
              ?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
          className={cn("size-2 rounded-full transition-all duration-300 ease-out", getStyle(index))}
        />
      ))}
    </motion.div>
  );
};
