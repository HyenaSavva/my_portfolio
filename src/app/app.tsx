import { useState, type FC } from "react";
import { Main, Sidebar } from "@/widgets";

export const App: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-screen h-screen font-jetbrains bg-gray-950 overflow-hidden relative">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
      <Main />
    </div>
  );
};
