import type { FC } from "react";
import { Subtitle } from "@/shared/ui";
import { siTelegram, siGmail } from "simple-icons";
import { Link } from "@/features/link/link";

export const Contact: FC = () => {
  return (
    <section id="contact" className="mt-12">
      <Subtitle className="mb-8" label="Contact" active />

      <div className="flex gap-3 pb-12 pl-10">
        <Link
          href="https://t.me/ghena_savva"
          icon={siTelegram}
          label="@ghena_savva"
        />
        <span className="mx-1 flex items-center px-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500 inline-block" />
        </span>
        <Link
          href="https://mail.google.com/mail/?view=cm&fs=1&to=re4meister@gmail.com"
          icon={siGmail}
          label="re4meister@gmail.com"
        />
      </div>
    </section>
  );
};
