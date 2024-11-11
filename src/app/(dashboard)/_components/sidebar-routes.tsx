"use client";

import SidebarItem from "@/app/(dashboard)/_components/sidebar-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CrownIcon, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const SidebarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-y-4">
      <div className="px-4">
        <Button
          onClick={() => {}}
          className="w-full rounded-xl border-none transition hover:bg-white hover:opacity-75"
          variant={"outline"}
          size="lg"
        >
          <CrownIcon className="mr-2 size-4 fill-yellow-500 text-yellow-500" />{" "}
          Upgrade to Pro
        </Button>
      </div>
      <Separator className="px-3" />
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={HomeIcon}
          label="Dashboard"
          isActive={pathname === "/"}
        />
      </ul>
      <Separator className="px-3" />
    </div>
  );
};

export default SidebarRoutes;
