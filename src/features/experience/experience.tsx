import type { FC } from "react";
import { Link } from "@tanstack/react-router";

import { Tag, Carousel, Status } from "@/shared/ui";
import { formatDateRange } from "@/shared/helpers";
import { supabase } from "@/shared/api";
import { cn } from "@/shared/lib";

type ExperienceProps = {
  experience: ExperienceType;
};

export const Experience: FC<ExperienceProps> = ({ experience }) => {
  const [from, to] = formatDateRange(experience.from, experience.to);
  const media: MediaItem[] =
    experience.img?.map((img) => ({
      type: "image" as const,
      src: supabase.storage.from("images").getPublicUrl(img).data.publicUrl,
    })) || [];

  const hasTagsOrLink = experience.tags?.length || experience.link;

  return (
    <section
      data-experience-id={experience.id}
      style={{ viewTransitionName: `experience-${experience.id}` }}
      className={cn(
        "group relative flex-col gap-3 rounded-xl p-4",
        "bg-linear-to-tr from-experience to-experience-highlight",
        "border border-white/5 transition-all duration-300",
        "hover:border-white/15",
      )}
    >
      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-b from-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex-col gap-3">
        {/* Header: Status and Date */}
        <div className="items-center gap-3 text-xs text-gray-500">
          {experience.type && <Status type={experience.type} />}
          <span>
            {from} - {to}
          </span>
        </div>

        {/* Title */}
        <Link to="/project/$id" params={{ id: experience.id }} className="w-fit" preload="intent">
          <h3 className="text-lg font-semibold text-primary transition-colors hover:text-blue-400">
            {experience.title}
          </h3>
        </Link>

        {/* Carousel */}
        {media.length > 0 && <Carousel media={media} />}

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-400 line-clamp-3">{experience.short_description}</p>

        {/* Tags */}
        {hasTagsOrLink && (
          <div className="flex flex-wrap gap-2">
            {experience.link && <Tag tagName="View on Github" tagUrl={experience.link} />}
            {experience.tags?.map((tag) => (
              <Tag key={tag} tagName={tag} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
