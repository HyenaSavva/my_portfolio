import { type FC } from "react";
import { Outlet } from "@tanstack/react-router";
// import { Sidebar } from "@/widgets";
import { TooltipProvider } from "@/shared/ui/tooltip";
// import { motion } from "motion/react";
import { Greeting } from "@/shared/ui";

export const RootLayout: FC = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex w-screen h-dvh font-jetbrains bg-background overflow-hidden relative leading-none">
        {/* <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} /> */}
        <Outlet />
      </div>
      <Greeting />
    </TooltipProvider>
  );
};
