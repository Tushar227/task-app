"use client";

import React, { useState } from "react";
import Input from "../utils/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUp = () => {
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
    {
      label: "re-Password",
      type: "password",
      placeholder: "re-Password...",
      name: "rePassword",
    },
  ];

  const registerUser = async (formData, onSubmitProps) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:9000/api/signup",
        formData
      );
      const token = response.data;
      localStorage.setItem("accessToken", token);
      onSubmitProps.setSubmitting(false);
      router.push("/components/Login");
      toast.success("SignUp Successful!");
    } catch (error) {
      toast.error("SignUp Failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: registerUser,
    validationSchema: Yup.object().shape({
      username: Yup.string().required().min(3).max(20),
      email: Yup.string()
        .required()
        .matches(
          "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}(?:.[A-Za-z]{2,})?"
        ),
      password: Yup.string()
        .required()
        .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*])(?=.{8,})"),
      rePassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Password Must Match"),
    }),
  });

  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border-[2.5px] border-gray-500 p-5 rounded-md bg-white shadow-lg w-[80%] mx-auto md:w-[25rem]">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col item-center gap-4"
        >
          <h1 className=" font-semibold text-center text-2xl uppercase pb-3 text-teal-600">
            Sign Up
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
            disabled={isSubmitting}
            className="p-3 mt-2 rounded-md hover:bg-teal-500 text-sm bg-teal-600 text-white font-bold"
          >
            {isSubmitting ? "Submitting.." : "Submit"}
          </button>
        </form>
        <p className="text-center pt-2 text-xs flex items-center justify-center gap-1">
          If you have an account
          <span
            onClick={() => router.push("/components/Login")}
            className="hover:opacity-70 cursor-pointer text-teal-600"
          >
            Sign In Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
