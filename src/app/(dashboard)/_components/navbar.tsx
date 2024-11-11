import UserButton from "@/features/auth/components/user-button";

const Navbar = () => {
  return (
    <nav className="flex h-[68px] w-full items-center border-b p-4">
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
