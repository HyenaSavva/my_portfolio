import type { FC } from "react";
import { Link } from "@tanstack/react-router";

import { Subtitle, Tag, Title, Carousel } from "@/shared/ui";
import { formatDateRange } from "@/shared/helpers";
import { supabase } from "@/shared/api";
import { cn } from "@/shared/lib";

type ExperienceProps = {
  experience: ExperienceType;
};

export const Experience: FC<ExperienceProps> = ({ experience }) => {
  const urls = experience.img?.map((img) => supabase.storage.from("images").getPublicUrl(img));
  const [from, to] = formatDateRange(experience.from, experience.to);
  const hasTagsOrLink = experience.tags?.length || experience.link;

  return (
    <section
      data-experience-id={experience.id}
      style={{ viewTransitionName: `experience-${experience.id}` }}
      className={cn(
        "flex flex-col gap-2 sm:gap-3 rounded-xl p-4",
        "bg-linear-to-tr from-experience to-experience-highlight",
      )}
    >
      <Subtitle label={`${from} - ${to} * ${experience.type}`} />

      <Link to="/project/$id" params={{ id: experience.id }} className="group w-fit">
        <Title label={experience.title || ""} className="group-hover:text-blue-400 transition-colors" />
      </Link>

      {urls && <Carousel images={urls.map(({ data: { publicUrl } }) => publicUrl)} />}

      <p className="text-body text-primary">{experience.description}</p>

      {hasTagsOrLink && (
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {experience.link && <Tag tagName="View on Github" tagUrl={experience.link} />}
          {experience.tags?.length && experience.link && (
            <span className="mx-1 flex items-center px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 inline-block" />
            </span>
          )}
          {experience.tags?.map((tag) => (
            <Tag key={tag} tagName={tag} />
          ))}
        </div>
      )}
    </section>
  );
};
