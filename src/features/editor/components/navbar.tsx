"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Logo from "@/features/editor/components/logo";
import { ChevronDownIcon, MousePointerClickIcon } from "lucide-react";
import { CiFileOn } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav className="flex h-[68px] w-full items-center gap-x-8 border-b p-4 lg:pl-[34px]">
      <Logo />
      <div className="flex size-full items-center gap-x-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              File <ChevronDownIcon className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => {}} //TODO: Add functionality
            >
              <CiFileOn className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        {/* TODO: Add functionality and dynamic class */}
        <Hint label="Select" side={"bottom"} sideOffset={10}>
          <Button variant={"ghost"} size="icon" onClick={() => {}} className="">
            <MousePointerClickIcon className="size-4" />
          </Button>
        </Hint>
      </div>
    </nav>
  );
};

export default Navbar;
