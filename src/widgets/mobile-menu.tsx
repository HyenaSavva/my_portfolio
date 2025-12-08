import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { FC } from "react";
import { siGithub } from "simple-icons";

import { Link } from "@/features/link/link";
import { Subtitle, IconCrossfade } from "@/shared/ui";
import { useNavigation } from "@/shared/hooks";
import { MenuIcon, CloseIcon } from "@/shared/assets";

export const MobileMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection, scrollToSection } = useNavigation();

  const navItems = [
    { id: "experience", label: "Experience & Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <div className="s:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-700 active:scale-95 transition-transform duration-150"
      >
        <IconCrossfade
          activeIndex={isOpen ? 1 : 0}
          icons={[<MenuIcon className="text-white size-6" />, <CloseIcon className="text-white size-6" />]}
        />
      </button>

      {/* Overlay - Motion only for exit animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-sm flex flex-col justify-between p-8 pt-16"
          >
            {/* Header */}
            <section className="flex flex-col gap-1">
              <h1 className="text-4xl dark:text-white font-sand font-bold">Ghena Savva</h1>
              <Subtitle label="Frontend Developer" active />
              <Subtitle className="text-xl dark:text-gray-600" label="Moldova" />
            </section>

            {/* Navigation - Tailwind stagger via delay utilities */}
            <section className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-2xl text-left font-semibold transition-all duration-300 ease-out
                    animate-[slideIn_0.3s_ease-out_forwards] opacity-0
                    ${index === 1 ? "[animation-delay:100ms]" : ""}
                    ${activeSection === item.id ? "dark:text-white" : "text-gray-500"}
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </section>

            {/* Footer */}
            <section className="flex flex-col gap-2">
              <Link href="https://github.com/HyenaSavva" icon={siGithub} label="HyenaSavva" />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
