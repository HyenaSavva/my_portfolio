import { useRef, useCallback, type FC } from "react";
import { tags } from "./lib/const";
import { tagDescriptions } from "./lib/descriptions";
import { useTooltip } from "@/shared/ui/tooltip";
import { cn } from "@/shared/lib";

type TagProps = {
  tagName: TagType["name"];
  tagUrl?: string;
};

export const Tag: FC<TagProps> = ({ tagName, tagUrl }) => {
  const tag = tags.find((t) => t.name === tagName);
  const tagRef = useRef<HTMLAnchorElement>(null);
  const { showTooltip, hideTooltip } = useTooltip();

  const handleMouseEnter = useCallback(() => {
    if (!tagRef.current || !tag) return;
    const rect = tagRef.current.getBoundingClientRect();
    showTooltip(
      {
        name: tag.name,
        description: tagDescriptions[tag.name] || "Technology",
      },
      {
        x: rect.left + rect.width / 2,
        y: rect.top - 8,
      },
    );
  }, [showTooltip, tag]);

  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  if (!tag) return null;

  return (
    <a
      ref={tagRef}
      href={tag.url ?? tagUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center text-gray-500 hover:text-gray-300 gap-1.5 sm:gap-2 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-lg border border-gray-700 hover:border-gray-500 transition-all duration-200"
    >
      <span className={cn("size-2.5 sm:size-3.5 transition-colors duration-200", `text-${tag.color}`)}>{tag.icon}</span>
      <span className="text-xs sm:text-base font-bold">{tag.name}</span>
    </a>
  );
};
