import { ReactNode } from "react";
import Sidebar from "@/app/(dashboard)/_components/sidebar";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-full bg-muted">
      <Sidebar />
      <div className="flex h-full flex-col lg:ml-[300px]">{children}</div>
    </div>
  );
};

export default DashboardLayout;
