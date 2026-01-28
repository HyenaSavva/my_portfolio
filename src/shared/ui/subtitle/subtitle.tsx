import type { FC, HTMLProps } from "react";
import { cn } from "@/shared/lib";

type SubtitleProps = {
  label: string;
  className?: string;
  active?: boolean;
} & HTMLProps<HTMLHeadingElement>;

export const Subtitle: FC<SubtitleProps> = ({ label, className, active, ...props }) => (
  <h2 className={cn("subtitle text-gray-600", active && "text-gray-500", className)} {...props}>
    {label}
  </h2>
);
