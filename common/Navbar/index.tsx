"use client";

import { useAuthContext } from "@/provider/AuthProvider";
import Link from "next/link";
import React from "react";

interface NavBarProps {
  navItems?: any[];
}

const NavBar: React.FC<NavBarProps> = ({ navItems }) => {
  const { userData:user, Logout } = useAuthContext();
  const handleLogout = async () => {
    try {
      await Logout();
    } catch (err) {
      console.error({ err });
    }
  };

  return (
    <div className=" h-20 bg-gray-300 flex w-full justify-between items-center px-3 md:px-8">
      <Link href={"/"}>
        <h1 className=" text-2xl">Next Auth</h1>
      </Link>
      <nav>
        <div className="hidden md:flex gap-5 items-center">
          {navItems &&
            navItems?.map(({ text, link }) => (
              <Link href={link} key={text}>
                <span className=" px-3">{text}</span>
              </Link>
            ))}
          {user.isLoggedIn ? (
            <button
              className=" border p-2 rounded-xl text-white bg-red-400"
              onClick={handleLogout}
            >
              LogOut
            </button>
          ) : (
            <Link href={"/login"}>Login</Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
