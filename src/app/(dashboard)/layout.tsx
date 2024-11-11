import Navbar from "@/app/(dashboard)/_components/navbar";
import Sidebar from "@/app/(dashboard)/_components/sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-full bg-muted">
      <Sidebar />
      <div className="flex h-full flex-col lg:ml-[300px]">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
