import type { FC } from "react";
import { default as Markdown } from "react-markdown";
import { Link, useParams, useRouter } from "@tanstack/react-router";

import { useGetExperienceById } from "@/entities/experience";
import { Subtitle, Tag, Title, Carousel, Status, ProjectMeta } from "@/shared/ui";
import { formatDateRange } from "@/shared/helpers";
import { supabase } from "@/shared/api";
import { cn } from "@/shared/lib";
import { ArrowLeftIcon } from "@/shared/assets";

export const ProjectPage: FC = () => {
  const { id } = useParams({ from: "/project/$id" });
  const { history } = useRouter<Router>();
  const { data: experience, isLoading } = useGetExperienceById(id || "");

  if (!isLoading && !experience) return <NotFound />;

  const [from, to] = experience ? formatDateRange(experience.from, experience.to) : ["", ""];
  const media: MediaItem[] = [];

  if (experience?.demo) {
    const videoUrl = supabase.storage.from("video").getPublicUrl(experience.demo).data.publicUrl;
    media.push({ type: "video", src: videoUrl });
  }

  experience?.img?.forEach((img) => {
    const imageUrl = supabase.storage.from("images").getPublicUrl(img).data.publicUrl;
    media.push({ type: "image", src: imageUrl });
  });

  return (
    <main className="flex-1 overflow-x-hidden p-3 sm:p-6 m:p-10 bg-background">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => history.back()}
          className={cn(
            "flex items-center gap-2 text-gray-500 hover:text-white my-2 transition-colors cursor-pointer text-xs",
            "group",
          )}
        >
          <ArrowLeftIcon className="translate-x-1 group-hover:translate-x-0 group-active:translate-x-0 transition-transform" />
          <span>Back to Portfolio</span>
        </button>

        <article
          style={{ viewTransitionName: `experience-${id}` }}
          className={cn("flex flex-col gap-3 sm:gap-4 rounded-xl")}
        >
          {!isLoading && (
            <>
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="center gap-4 justify-start">
                  {experience?.type && <Status type={experience.type} />}
                  <Subtitle label={`${from} - ${to}`} />
                </div>

                <Title label={experience?.title || ""} className="tracking-tight" />
              </div>

              {experience?.short_description && (
                <p className="description leading-relaxed text-gray-500">{experience.short_description}</p>
              )}

              <ProjectMeta role={experience?.role} company={experience?.company} team={experience?.team} />

              {media.length > 0 && <Carousel media={media} />}
              <div className="flex">{experience?.link && <Tag tagName="View on Github" tagUrl={experience?.link} />}</div>

              <Title label="Overview" />
              <p className="description leading-relaxed text-gray-500 prose dark:prose-invert">
                <Markdown>{experience?.description}</Markdown>
              </p>

              <Title label="Tech Stack" />
              {experience?.tags && experience.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
