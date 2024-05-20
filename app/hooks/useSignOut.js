import React from "react";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    router.push("/components/Login");
  };

  return handleSignOut;
};
