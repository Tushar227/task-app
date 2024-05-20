"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NotLoggedInMessage from "../components/Task/[userId]/NotLoggedInMessage";
import { useSignOut } from "./useSignOut";

export const CheckSession = () => {
  const router = useRouter();
  const handleSignOut = useSignOut();
  const accessToken = localStorage.getItem("accessToken");
  const userIdNum = localStorage.getItem("userId");
  const userId = userIdNum.toString();

  useEffect(() => {
    // If JWT token is not present, display the "Not Logged In" message and return
    if (!accessToken) {
      return false;
    }

    // Check if JWT token is present in local storage
    axios
      .post("http://localhost:9000/api/checkSession", { token: accessToken })
      .then((response) => {
        // Handle successful token validation if needed
        return true;
      })
      .catch((error) => {
        // Handle token validation errors (optional, consider centralized error handling)
        // console.log("Token is invalid or expired:", error);
        handleSignOut(); // Call sign-out function to clear session
      });
  }, [accessToken]);

  // If JWT token is not present, display the "Not Logged In" message
  return false;
};
