import { ProgressView, Skeleton } from "@/shared/ui";

export const ExperienceSkeleton = () => {
  return (
    <section className="flex">
      <ProgressView />
      <div className="flex flex-col w-full gap-3 mb-6 px-10 pb-12">
        <h2 className="w-2/3 h-10">
          <Skeleton />
        </h2>
        <h1 className="w-4/7 h-12">
          <Skeleton />
        </h1>
        <div className="h-76">
          <Skeleton />
        </div>
        <div className="h-18">
          <Skeleton />
        </div>
        <ul className="flex h-24 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <li key={item} className="w-32 h-12">
              <Skeleton />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
