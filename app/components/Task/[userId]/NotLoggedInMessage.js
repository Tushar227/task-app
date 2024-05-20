import React from "react";
import { useRouter } from "next/navigation";

function NotLoggedInMessage() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center ">
      <div>
        <div className="font-bold text-3xl">
          <p>User Not Logged In</p>
        </div>
        <div className="font-bold text-2xl pt-3">
          <button
            className="h-10 px-6 font-semibold rounded-md bg-black text-white"
            onClick={() => router.push("/components/Login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotLoggedInMessage;
