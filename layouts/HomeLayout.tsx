import NavBar from "@/common/Navbar";
import type { FC } from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const HomeLayout: FC<Props> = ({ className, children }) => (
  <div className={`flex min-h-screen flex-col items-center ${className}`}>
    <NavBar/>
    <main>{children}</main>
  </div>
);

export default HomeLayout;
