import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex h-full items-center justify-center bg-slate-100">
      {children}
    </div>
  );
};

export default AuthLayout;
