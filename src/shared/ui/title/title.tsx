import type { FC } from "react";
import { cn } from "@/shared/lib";

interface TitleProps {
  label: string;
  className?: string;
}

export const Title: FC<TitleProps> = ({ label, className }) => (
  <h1 className={cn("font-sand font-bold text-title text-primary", className)}>{label}</h1>
);
