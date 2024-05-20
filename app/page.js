"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/components/Login");
  };

  const handleSignUpClick = () => {
    router.push("/components/SignUp");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold mb-8 text-teal-600">Task App</h1>
      <p className="text-lg mb-2 text-center text-gray-800">
        Welcome to Task App📝
        <span className="block mt-2">
          Manage your tasks effortlessly with our user-friendly platform.
        </span>
      </p>

      <p className="mb-8 text-xl font-bold text-gray-700">
        Sign Up or Login to Get Started..!!
      </p>
      <div className="space-x-4">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md font-semibold shadow-md"
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md font-semibold shadow-md"
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-black">Key Features</h2>
        <ul className="list-disc list-inside text-gray-800">
          <li>Login and Sign Up Functionality</li>
          <li>Add, Edit, and Delete Tasks</li>
          <li>User-friendly Interface</li>
          <li>Effortless Task Management</li>
        </ul>
      </div>
    </div>
  );
}
