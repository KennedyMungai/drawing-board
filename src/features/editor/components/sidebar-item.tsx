import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
};

const SidebarItem = ({ icon: Icon, label, onClick, isActive }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      className={cn(
        "flex aspect-video size-full flex-col rounded-none p-3 py-4",
        isActive && "bg-muted text-primary",
      )}
    >
      <Icon className="size-5 shrink-0 stroke-2" />
      <span className="mt-2 text-xs">{label}</span>
    </Button>
  );
};

export default SidebarItem;
