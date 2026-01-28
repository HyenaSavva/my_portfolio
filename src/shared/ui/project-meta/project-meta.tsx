import { CogIcon, CompanyIcon, TeamIcon } from "@/shared/assets";
import type { FC } from "react";

interface ProjectMetaProps {
  role?: string | null;
  company?: string | null;
  team?: string | null;
}

export const ProjectMeta: FC<ProjectMetaProps> = ({ role, company, team }) => {
  if (!role && !company && !team) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 border border-white/10 rounded-xl">
      {role && (
        <div className="flex gap-3 items-center">
          <div className="center p-2 rounded-lg bg-white/5">
            <CogIcon className="size-5 text-blue-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Role</span>
            <span className="text-white text-sm">{role}</span>
          </div>
        </div>
      )}
      {company && (
        <div className="flex gap-3 items-center">
          <div className="center p-2 rounded-lg bg-white/5">
            <CompanyIcon className="size-5 text-blue-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Company</span>
            <span className="text-white text-sm">{company}</span>
          </div>
        </div>
      )}
      {team && (
        <div className="flex gap-3 items-center">
          <div className="center p-2 rounded-lg bg-white/5">
            <TeamIcon className="size-5 text-blue-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Team</span>
            <span className="text-white text-sm">{team}</span>
          </div>
        </div>
      )}
    </div>
  );
};
