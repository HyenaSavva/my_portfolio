import type { FC } from "react";
import { cn } from "@/shared/lib";
import { statusMap, type ExperienceType } from "./const";

interface StatusProps {
  type: ExperienceType;
}

export const Status: FC<StatusProps> = ({ type }) => {
  const style = statusMap[type];

  return (
    <div className={cn("flex items-center gap-2 px-2 py-1 text-xs rounded-full border", style.container)}>
      <span className={cn("size-1.5 rounded-full animate-pulse", style.dot)} />
      {type}
    </div>
  );
};
