import { type FC } from "react";

export const ProgressView: FC = () => {
  return (
    <div className="flex justify-center w-0.5 h-full bg-gray-800 group-hover:bg-radial group-hover:from-gray-600 to-gray-800 transition-colors duration-300">
      <div className="flex">
        <div className="flex rounded-full w-4 h-4 bg-gray-950 border-2 border-gray-800 group-hover:border-gray-600 justify-self-center self-center transition-colors duration-300" />
      </div>
    </div>
  );
};

export const ViewLine: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-[700px]">
      <div className="flex min-h-24 w-0.5 bg-gradient-to-t from-gray-800 to-gray-950" />
      {children}
      <div className="flex min-h-24 w-0.5 bg-gradient-to-b from-gray-800 to-gray-950" />
    </div>
  );
};
