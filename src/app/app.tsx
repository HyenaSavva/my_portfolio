import { motion } from "motion/react";
import type { FC } from "react";
import { Main, Sidebar } from "@/widgets";

export const App: FC = () => {
  const greetings = [
    "Привет",
    "こんにちは",
    "Bună",
    "مرحبا",
    "Bonjour",
    "Hello",
  ];

  return (
    <div className="flex w-screen h-screen font-jetbrains bg-white dark:bg-gray-950 overflow-hidden relative">
      <Sidebar />
      <Main />

      <motion.div
        className="absolute inset-0 bg-gray-950 flex items-center justify-center"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 2 }}
      >
        {greetings.map((greeting, index) => (
          <motion.h1
            key={greeting}
            className="text-4xl font-bold text-white absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: index === greetings.length - 1 ? 1 : 0.3,
              delay: index * 0.3,
            }}
          >
            {greeting}
          </motion.h1>
        ))}
      </motion.div>
    </div>
  );
};
