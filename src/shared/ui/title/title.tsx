import type { FC } from "react";
import { twMerge } from "tailwind-merge";

interface TitleProps {
  label: string;
  className?: string;
}

export const Title: FC<TitleProps> = ({ label, className }) => {
  const styles = twMerge(
    `font-sand font-bold text-4xl dark:text-white ${className}`
  );

  return <h1 className={styles}>{label}</h1>;
};
