import type { FC } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siGithub } from "simple-icons";

import { Link } from "@/features/link/link";
import { EdgeTrigger } from "@/features/edge-trigger";
import { Subtitle } from "@/shared/ui";
import { useNavigation } from "@/shared/hooks";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { activeSection, scrollToSection } = useNavigation();

  const navItems = [
    { id: "experience", label: "Experience & Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    onToggle();
  };

  return (
    <>
      {/* Edge trigger - always visible when closed */}
      {!isOpen && <EdgeTrigger onTrigger={onToggle} alwaysVisible />}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Panel - fullscreen, slides from left */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 z-40 bg-gray-950/90 backdrop-blur-md"
            >
              {/* Close trigger on right edge */}
              <EdgeTrigger onTrigger={onToggle} side="right" alwaysVisible />

              <div className="h-full p-panel pt-16 flex flex-col justify-between cursor-default">
                {/* Header */}
                <section className="flex flex-col gap-1">
                  <h1 className="text-title text-white font-sand font-bold">Ghena Savva</h1>
                  <Subtitle label="Frontend Developer" active className="text-subtitle" />
                  <Subtitle label="Moldova" className="text-body text-gray-600" />
                </section>

                {/* Navigation */}
                <section className="flex flex-col gap-4">
                  {navItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-nav text-left font-semibold transition-all duration-300 cursor-pointer
                        animate-[slideIn_0.3s_ease-out_forwards] opacity-0
                        ${activeSection === item.id ? "text-white" : "text-gray-500"}
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
