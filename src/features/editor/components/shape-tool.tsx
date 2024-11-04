import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

type Props = {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
};

const ShapeTool = ({ icon: Icon, onClick, iconClassName }: Props) => {
  return (
    <button onClick={onClick} className="aspect-square rounded-md border p-5">
      <Icon className={cn("size-full", iconClassName)} />
    </button>
  );
};

export default ShapeTool;
