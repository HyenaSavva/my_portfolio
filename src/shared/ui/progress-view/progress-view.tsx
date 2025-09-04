import type { FC } from "react";

export const ProgressView: FC = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 w-[16px] h-full bg-radial from-gray-800 to-gray-950 group-hover:from-gray-600 transition-colors duration-300 ease-in-out">
      <div className="col-start-1 row-start-1 rounded-full w-4 h-4 bg-gray-950 border-2 border-gray-800 group-hover:border-gray-600 justify-self-center self-center transition-colors duration-300"></div>
    </div>
  );
};
