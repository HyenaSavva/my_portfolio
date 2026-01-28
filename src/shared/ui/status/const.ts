export type ExperienceType = "Education" | "In Progress" | "Completed" | "Employment" | "Internship";

type StatusStyle = {
  container: string;
  dot: string;
};

export const statusMap: Record<ExperienceType, StatusStyle> = {
  Education: {
    container: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
    dot: "bg-indigo-400 shadow-[0_0_4px_2px_rgba(129,140,248,0.6)]",
  },
  "In Progress": {
    container: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    dot: "bg-amber-400 shadow-[0_0_4px_2px_rgba(251,191,36,0.6)]",
  },
  Completed: {
    container: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    dot: "bg-emerald-400 shadow-[0_0_4px_2px_rgba(52,211,153,0.6)]",
  },
  Employment: {
    container: "border-violet-500/30 text-violet-400 bg-violet-500/10",
    dot: "bg-violet-400 shadow-[0_0_4px_2px_rgba(167,139,250,0.6)]",
  },
  Internship: {
    container: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    dot: "bg-cyan-400 shadow-[0_0_4px_2px_rgba(34,211,238,0.6)]",
  },
};
