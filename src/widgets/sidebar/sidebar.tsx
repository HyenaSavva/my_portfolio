import type { FC } from "react";
import { Drawer } from "vaul";
import { siGithub } from "simple-icons";
import { Link as RouterLink, useLocation } from "@tanstack/react-router";

import { Link } from "@/features/link/link";
import { EdgeTrigger } from "@/features/edge-trigger";
import { Subtitle } from "@/shared/ui";
import { useNavigation } from "@/shared/hooks";
import { cn } from "@/shared/lib";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const { activeSection, scrollToSection } = useNavigation();

  const navItems = [
    { id: "experience", label: "Experience & Projects" },
    { id: "contact", label: "Contact" },
  ];

  const content = (
    <div className="h-full w-72 p-6 flex flex-col justify-between">
      <section className="flex flex-col gap-1">
        <h1 className="text-title text-white font-sand font-bold">Ghena Savva</h1>
        <Subtitle label="Frontend Developer" active />
        <Subtitle label="Moldova" className="text-body text-gray-600" />
      </section>

      <nav className="flex flex-col gap-4">
        {isHomePage ? (
          navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "font-jetbrains text-nav text-left font-semibold transition-colors cursor-pointer",
                activeSection === item.id ? "text-white" : "text-gray-500 hover:text-gray-300",
              )}
            >
              {item.label}
            </button>
          ))
        ) : (
          <RouterLink to="/" className="font-jetbrains text-nav font-semibold text-gray-500 hover:text-white transition-colors">
            &larr; Back to Portfolio
          </RouterLink>
        )}
      </nav>

      <section>
        <Link href="https://github.com/HyenaSavva" icon={siGithub} label="HyenaSavva" />
      </section>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block shrink-0 bg-gray-950/50 border-r border-gray-800/50">
        {content}
      </aside>

      {/* Mobile */}
      <div className="lg:hidden">
        {!isOpen && <EdgeTrigger onTrigger={onToggle} alwaysVisible />}

        <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onToggle()} direction="left">
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-(--z-modal) bg-black/60" />
            <Drawer.Content className="fixed left-0 inset-y-0 z-(--z-modal) bg-gray-950 outline-none">
              <Drawer.Title className="sr-only">Navigation</Drawer.Title>
              {content}
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </>
  );
};
