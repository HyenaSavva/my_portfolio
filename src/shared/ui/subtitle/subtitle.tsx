import type { FC, HTMLProps } from "react";
import { cn } from "@/shared/lib";

type SubtitleProps = {
  label: string;
  className?: string;
  active?: boolean;
} & HTMLProps<HTMLHeadingElement>;

export const Subtitle: FC<SubtitleProps> = ({ label, className, active, ...props }) => {
  const styles = cn(
    "text-2xl s:text-3xl font-semibold dark:text-gray-600 font-jetbrains",
    active && "dark:text-gray-500",
    className,
  );

  return (
    <h2 className={styles} {...props}>
      {label}
    </h2>
  );
};
