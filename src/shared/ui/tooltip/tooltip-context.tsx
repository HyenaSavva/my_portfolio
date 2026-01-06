import { createContext, useContext, useState, useCallback, type FC, type ReactNode } from "react";
import { FloatingTooltip } from "./floating-tooltip";

type TooltipData = {
  name: string;
  description: string;
};

type TooltipPosition = {
  x: number;
  y: number;
};

type TooltipContextType = {
  tooltipData: TooltipData | null;
  position: TooltipPosition;
  isVisible: boolean;
  showTooltip: (data: TooltipData, position: TooltipPosition) => void;
  hideTooltip: () => void;
};

const TooltipContext = createContext<TooltipContextType | null>(null);

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("useTooltip must be used within TooltipProvider");
  return context;
};

export const TooltipProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [position, setPosition] = useState<TooltipPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = useCallback((data: TooltipData, pos: TooltipPosition) => {
    setTooltipData(data);
    setPosition(pos);
    setIsVisible(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <TooltipContext.Provider value={{ tooltipData, position, isVisible, showTooltip, hideTooltip }}>
      {children}
      <FloatingTooltip />
    </TooltipContext.Provider>
  );
};
