import Logo from "@/app/(dashboard)/_components/logo";
import SidebarRoutes from "@/app/(dashboard)/_components/sidebar-routes";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 hidden h-full w-[300px] shrink-0 flex-col lg:flex">
      <Logo />
      <SidebarRoutes />
    </aside>
  );
};

export default Sidebar;
