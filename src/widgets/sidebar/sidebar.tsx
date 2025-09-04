import { siGithub, siTelegram } from "simple-icons";
import { motion } from "motion/react";

import { Link } from "@/features/link/link";
import { Subtitle } from "@/shared/ui";
import { useNavigation } from "@/shared/hooks/useNavigation";

export const Sidebar = () => {
  const { activeSection, scrollToSection } = useNavigation();

  const navItems = [
    { id: "experience", label: "* Experience & Projects" },
    { id: "contact", label: "* Contact" },
  ];

  return (
    <div className="w-[512px] h-full px-16 py-20 flex flex-col justify-between border-r-2 border-gray-900 cursor-default">
      <section className="flex flex-col gap-1">
        <h1 className="text-5xl dark:text-white font-sand font-bold">
          Ghena Savva
        </h1>
        <Subtitle label="Frontend Developer" active />
        <Subtitle className="text-2xl dark:text-gray-600" label="Moldova" />
      </section>

      <section className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Subtitle
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-3xl text-left font-semibold transition-all duration-300 cursor-pointer ${
              activeSection === item.id
                ? "dark:text-gray-300"
                : "text-gray-600 hover:text-gray-300"
            }`}
            label={item.label}
          >
            <span className="text-2xl">{item.label}</span>
          </Subtitle>
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <Link
          href="https://github.com/HyenaSavva"
          icon={siGithub}
          label="HyenaSavva"
        />
      </section>
    </div>
  );
};
