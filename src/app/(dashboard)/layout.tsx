import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return <div className="h-full bg-muted">{children}</div>;
};

export default DashboardLayout;
