import { useGetAllExperiences } from "@/entities/experiences";
import { Subtitle } from "@/shared/ui";
import { lazy, Suspense } from "react";

const Experience = lazy(() => import("@/features/experience"));

export const Main = () => {
  const { data: experiences = [] } = useGetAllExperiences();

  return (
    <main className="flex p-16 overflow-auto flex-1">
      <div className="flex flex-col w-[700px]">
        <Subtitle className="mb-8" label="Experience & Projects" active />
        <Suspense fallback={<div>Loading...</div>}>
          {experiences
            .sort(
              (a, b) =>
                new Date(b?.from ?? "").getTime() -
                new Date(a.from ?? "").getTime()
            )
            .map((exp, index) => (
              <Experience key={exp.id || index} experience={exp} />
            ))}
        </Suspense>
      </div>
    </main>
  );
};
