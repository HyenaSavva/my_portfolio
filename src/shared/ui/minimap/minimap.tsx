import { type FC } from "react";
import { motion } from "motion/react";
import { useActiveSection } from "@/shared/hooks/use-active-section";
import { useIsDesktop } from "@/shared/hooks/use-media-query";

type MinimapProps = {
  items: string[];
};

export const Minimap: FC<MinimapProps> = ({ items }) => {
  const activeId = useActiveSection(items, { attribute: "data-experience-id" });
  const isDesktop = useIsDesktop();

  if (!items.length || !isDesktop) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-(--z-above) flex flex-col gap-2"
    >
      {items.map((id) => (
        <button
          key={id}
          onClick={() =>
            document
              .querySelector(`[data-experience-id="${id}"]`)
              ?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            activeId === id ? "bg-white" : "bg-gray-600"
          }`}
        />
      ))}
    </motion.div>
  );
};
