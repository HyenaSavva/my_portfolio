type ArrowProps = {
  direction: "left" | "right";
};

export const Arrow = ({ direction }: ArrowProps) => {
  return (
    <span
      className={`flex justify-self-center w-6 h-6 border-l-4 border-t-4 border-gray-200 ${
        direction === "left" ? "-rotate-45" : "rotate-135"
      }`}
    />
  );
};
