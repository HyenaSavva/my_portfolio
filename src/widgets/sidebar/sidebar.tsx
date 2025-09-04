import { siGithub, siTelegram } from "simple-icons";

import { Link } from "@/features/link/link";
import { Subtitle } from "@/shared/ui";

export const Sidebar = () => {
  return (
    <div className="w-[512px] h-full px-16 py-20 flex flex-col justify-between border-r-2 border-gray-900">
      <section className="flex flex-col gap-1">
        <h1 className="text-5xl dark:text-white font-sand font-bold">
          Ghena Savva
        </h1>
        <Subtitle label="Frontend Developer" active />
        <Subtitle className="text-2xl dark:text-gray-600" label="Moldova" />
      </section>
      <section>
        <Subtitle label="* Experience & Projects" />
        <Subtitle label="* Contact" />
      </section>
      <section className="flex flex-col gap-2">
        <Link
          href="https://github.com/HyenaSavva"
          icon={siGithub}
          label="HyenaSavva"
        />

        <Link
          href="https://t.me/ghena_savva"
          icon={siTelegram}
          label="@ghena_savva"
        />
      </section>
    </div>
  );
};
