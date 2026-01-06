import { AnimatePresence, motion } from "motion/react";
import { Subtitle, Minimap, Skeleton } from "@/shared/ui";
import { useGetAllExperiences } from "@/entities/experience";
import { Experience } from "@/features/experience";
import { useScrollRestoration } from "@/shared/hooks/use-scroll-restoration";
import { Contact } from "../contact/contact";

export const Main = () => {
  const { data: experiences = [], isLoading } = useGetAllExperiences();
  useScrollRestoration("main-content", [isLoading]);

  const sortedExperiences = experiences.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <>
      <main id="main-content" className="flex justify-center p-4 sm:p-6 lg:p-12 overflow-auto flex-1 cursor-default">
        <div className="flex flex-col w-full min-w-0 max-w-4xl">
          <Subtitle className="mb-4" label="Experience & Projects" active id="experience" />
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeletons"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <ExperienceSkeleton key={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="experiences"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {sortedExperiences.map((exp) => (
                  <Experience key={exp.id} experience={exp} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <Contact />
        </div>
      </main>
      {!isLoading && <Minimap items={sortedExperiences.map((exp) => String(exp.id))} />}
    </>
  );
};

const ExperienceSkeleton = () => (
  <div className="flex flex-col gap-3 rounded-xl p-4 bg-linear-to-tr from-experience to-experience-highlight">
    <div className="w-1/3 h-4">
      <Skeleton />
    </div>
    <div className="w-2/3 h-7">
      <Skeleton />
    </div>
    <div className="w-full h-48 rounded-lg">
      <Skeleton />
    </div>
    <div className="flex flex-col gap-2">
      <div className="w-full h-4">
        <Skeleton />
      </div>
      <div className="w-3/4 h-4">
        <Skeleton />
      </div>
    </div>
    <div className="flex gap-2">
      <div className="w-20 h-8 rounded-lg">
        <Skeleton />
      </div>
      <div className="w-16 h-8 rounded-lg">
        <Skeleton />
      </div>
      <div className="w-24 h-8 rounded-lg">
        <Skeleton />
      </div>
    </div>
  </div>
);
