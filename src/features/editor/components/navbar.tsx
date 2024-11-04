"use client";

import Logo from "@/features/editor/components/logo";

const Navbar = () => {
  return (
    <nav className="flex h-[68px] w-full items-center gap-x-8 border-b p-4 lg:pl-[34px]">
      <Logo />
    </nav>
  );
};

export default Navbar;
