import type { FC } from "react";
import { tags } from "./lib/const";

type TagProps = {
  tagName: TagType["name"];
  tagUrl?: string;
};

export const Tag: FC<TagProps> = ({ tagName, tagUrl }) => {
  const tag = tags.find((t) => t.name === tagName);
  if (!tag) return null;

  return (
    <a
      href={tag.url ?? tagUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-gray-500 hover:text-gray-300 gap-2 px-4 py-2 rounded-xl border-2 border-gray-700 hover:border-gray-500 transition-all duration-200"
    >
      <span
        className={`w-5 h-5 text-${tag.color} transition-colors duration-200`}
      >
        {tag.icon}
      </span>
      <span className="font-bold">{tag.name}</span>
    </a>
  );
};
