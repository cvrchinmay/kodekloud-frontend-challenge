"use client";

import IconButton from "@/common/ui/IconButton";
import { useAuthContext } from "@/provider/AuthProvider";
import { authProvider } from "@/utils/global";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface LoginWithContainerProps {}

const LoginWithContainer: React.FC<LoginWithContainerProps> = ({}) => {
  const router = useRouter();
  const { userData:user, signFunctions } = useAuthContext();

  const handleLogin = async (id: string) => {
    const singInFunction = signFunctions[id];
    try {
      if (singInFunction) {
        await singInFunction();
      }
    } catch (err) {
      console.error({ err });
    }
  };

  useEffect(() => {
    // console.log({user});
    if (user.isLoggedIn) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="shadow-xl px-12 rounded-2xl border border-gray-200 flex items-center justify-start gap-5 flex-col pt-8 pb-14">
      <h3>Login to Continue</h3>
      {authProvider.map((auth) => {
        const { id, text, icon } = auth;
        return (
          <IconButton
            key={id}
            icon={icon}
            text={text}
            handleOnClick={() => handleLogin(id)}
            className="!w-fit md:!w-full !px-8 p-2 text-black border-black rounded-xl gap-x-3"
          />
        );
      })}
    </div>
  );
};

export default LoginWithContainer;
