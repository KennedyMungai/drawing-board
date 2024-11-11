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
        <main className="flex-1 overflow-auto rounded-tl-2xl bg-white p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
