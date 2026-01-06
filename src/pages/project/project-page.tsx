import type { FC } from "react";
import { Link, useParams, useRouter } from "@tanstack/react-router";

import { useGetExperienceById } from "@/entities/experience";
import { Subtitle, Tag, Title, Carousel } from "@/shared/ui";
import { formatDateRange } from "@/shared/helpers";
import { supabase } from "@/shared/api";
import { cn } from "@/shared/lib";

export const ProjectPage: FC = () => {
  const { id } = useParams({ from: "/project/$id" });
  const { history } = useRouter<Router>();
  const { data, isLoading } = useGetExperienceById(id || "");

  const experience = data?.data;

  if (!isLoading && !experience) return <NotFound />;

  const urls = experience?.img?.map((img) => supabase.storage.from("images").getPublicUrl(img));
  const [from, to] = experience ? formatDateRange(experience.from, experience.to) : ["", ""];

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => history.back()}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-6 transition-colors"
        >
          <span className="text-lg">&larr;</span>
          <span>Back to Portfolio</span>
        </button>

        <article
          style={{ viewTransitionName: `experience-${id}` }}
          className={cn(
            "flex flex-col gap-4 rounded-xl p-6",
            "bg-linear-to-tr from-experience to-experience-highlight",
          )}
        >
          {!isLoading && (
            <>
              <Subtitle label={`${from} - ${to} * ${experience?.type}`} />
              <Title label={experience?.title || ""} />

              {urls && urls.length > 0 && <Carousel images={urls.map(({ data: { publicUrl } }) => publicUrl)} />}

              <p className="text-body text-primary leading-relaxed">{experience?.description}</p>

              {experience?.tags && experience.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {experience.link && <Tag tagName="View on Github" tagUrl={experience.link} />}
                  {experience.tags.map((tag) => (
                    <Tag key={tag} tagName={tag} />
                  ))}
                </div>
              )}
            </>
          )}
        </article>
      </div>
    </main>
  );
};

const NotFound: FC = () => (
  <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-12 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">404</h1>
      <p className="text-gray-500 mb-6">Project not found</p>
      <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
        &larr; Back to Portfolio
      </Link>
    </div>
  </main>
);
