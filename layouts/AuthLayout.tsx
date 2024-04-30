import NavBar from "@/common/Navbar";
import type { FC } from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const AuthLayout: FC<Props> = ({ className, children }) => (
  <div className={`h-screen w-screen  ${className}`}>
    <NavBar />
    <main className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center">
      {children}
    </main>
  </div>
);

export default AuthLayout;
