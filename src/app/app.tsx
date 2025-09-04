import type { FC } from "react";
import { Main, Sidebar } from "@/widgets";

export const App: FC = () => {
  return (
    <div className="flex w-screen h-screen font-jetbrains bg-white dark:bg-gray-950">
      <Sidebar />
      <Main />
    </div>
  );
};
