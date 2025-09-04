import { lazy } from "react";

import { Subtitle, ViewLine } from "@/shared/ui";
import { useGetAllExperiences } from "@/entities/experiences";
import { ExperienceSkeleton } from "@/features/experience/skeleton";
import { Contact } from "../contact/contact";

const Experience = lazy(() => import("@/features/experience"));

export const Main = () => {
  const { data: experiences = [] } = useGetAllExperiences();

  const sortedExperiences = experiences.sort((a, b) =>
    a.from && b.from // sort by date descending
      ? new Date(b.from).getTime() - new Date(a.from).getTime()
      : 0
  );

  return (
    <main className="flex p-16 overflow-auto flex-1 cursor-default">
      <div className="flex flex-col">
        <Subtitle
          className="mb-4"
          label="Experience & Projects"
          active
          id="experience"
        />
        <ViewLine>
          {experiences.length === 0 &&
            [1, 2, 3].map((key) => <ExperienceSkeleton key={key} />)}

          {sortedExperiences.map((exp, index) => (
            <Experience key={exp.id || index} experience={exp} />
          ))}
        </ViewLine>
        <Contact />
      </div>
    </main>
  );
};
