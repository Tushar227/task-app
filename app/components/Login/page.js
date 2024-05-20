"use client";

import React from "react";
import { useState } from "react";
import Input from "../utils/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Login = ({ setLog }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const inputs = [
    {
      label: "Username",
      type: "text",
      placeholder: "Username...",
      name: "username",
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Email...",
      name: "email",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Password...",
      name: "password",
    },
  ];

  const loginUser = async (formData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:9000/api/login",
        formData
      );
      const token = response.data.token;
      const userIdNum = response.data.userId;
      const userId = userIdNum.toString();
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userId", userId);
      toast.success("Login Successful");

      router.push(`/components/Task/${userId}`);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: loginUser,
    validationSchema: Yup.object().shape({
      username: Yup.string().required().min(3).max(20),
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),
  });

  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        onSubmit={formik.handleSubmit}
        className="border-1 border-gray-600 p-5 rounded-md bg-white shadow-lg w-[80%] mx-auto md:w-[25rem]"
      >
        <form className="flex flex-col item-center gap-4">
          <h1 className="font-semibold text-center text-2xl uppercase pb-3 text-teal-600">
            Sign In
          </h1>
          {inputs.map((item, i) => (
            <Input
              item={item}
              key={i}
              handleChange={handleChange}
              formik={formik}
            />
          ))}
          <button
            type="submit"
            className="p-3 mt-2 rounded-md hover:bg-teal-500 text-sm bg-teal-600 text-white font-bold"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
        <p className="text-center pt-2 text-xs flex items-center justify-center gap-1">
          If you don't have an account
          <span
            onClick={() => router.push("/components/SignUp")}
            className="hover:opacity-70 cursor-pointer text-teal-600"
          >
            Sign Up Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
