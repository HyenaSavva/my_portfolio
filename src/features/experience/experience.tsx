import type { FC } from "react";

import { ProgressView, Subtitle, Tag, Title, Carousel } from "@/shared/ui";
import { formatDateRange } from "@/shared/helpers";
import { supabase } from "@/shared/api";

type ExperienceProps = {
  experience: ExperienceType;
};

export const Experience: FC<ExperienceProps> = ({ experience }) => {
  const urls = experience.img?.map((img) =>
    supabase.storage.from("images").getPublicUrl(img)
  );

  const areTagsAvailable = Boolean(
    experience.tags && experience.tags.length > 0
  );

  const [from, to] = formatDateRange(experience.from, experience.to);

  return (
    <div className="group flex w-full">
      <ProgressView />
      <section className="flex flex-col gap-3 pb-4 px-2 s:pb-12 s:px-10">
        <Subtitle
          className="text-2xl"
          label={`${from} - ${to} * ${experience.type}`}
        />

        <Title label={experience.title || ""} />

        {urls && (
          <Carousel images={urls.map(({ data: { publicUrl } }) => publicUrl)} />
        )}

        <p className="text-gray-200">{experience.description}</p>

        {areTagsAvailable && (
          <div className="flex flex-wrap gap-2">
            {experience.link && (
              <Tag tagName="View on Github" tagUrl={experience.link} />
            )}
            <span className="mx-1 flex items-center px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 inline-block" />
            </span>
            {experience.tags?.map((tag) => (
              <Tag key={tag} tagName={tag} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
