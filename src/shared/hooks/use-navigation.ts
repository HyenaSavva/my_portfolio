import { useActiveSection } from "./use-active-section";

const SECTIONS = ["experience", "contact"];

export const useNavigation = () => {
  const activeSection = useActiveSection(SECTIONS);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { activeSection, scrollToSection };
};
