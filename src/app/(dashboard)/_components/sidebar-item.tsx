import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ href, icon: Icon, label, isActive, onClick }: Props) => {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          "flex items-center rounded-xl bg-transparent p-3 transition hover:bg-white",
          isActive && "bg-white",
        )}
      >
        <Icon className="mr-2 size-4 stroke-2" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
