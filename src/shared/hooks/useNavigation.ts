import { useState } from "react";

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState<string>("experience");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(sectionId);
    }
  };

  return { activeSection, scrollToSection };
};
