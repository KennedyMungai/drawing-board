import { ReactNode } from "react";
import Sidebar from "@/app/(dashboard)/_components/sidebar";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-full bg-muted">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
