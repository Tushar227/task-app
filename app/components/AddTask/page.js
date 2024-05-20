// "use client";

// import React, { useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Input from "../utils/Input";
// import toast from "react-hot-toast";

// const TaskForm = () => {
//   const accessToken = localStorage.getItem("accessToken");

//   if (!accessToken) {
//     return <NotLoggedInMessage />;
//   }
//   const router = useRouter();
//   const userIdNum = localStorage.getItem("userId");
//   const userId = userIdNum.toString();

//   const inputs = [
//     {
//       label: "Task Name",
//       type: "text",
//       placeholder: "Add Task",
//       name: "taskName",
//     },
//     {
//       label: "Task Description",
//       type: "text",
//       placeholder: "Add Task Description",
//       name: "taskDescription",
//     },
//   ];

//   const addTask = async (formData) => {
//     try {
//       formik.setSubmitting(true);
//       formData.taskStatus = false;
//       const userId = localStorage.getItem("userId");
//       // console.log(typeof userId);

//       const response = await axios.post(
//         "http://localhost:9000/api/createTask",
//         { formData, userId }
//       );

//       toast.success("Task Added!");
//       const data = response.data;
//       // console.log(data.formData);

//       //   router.push("/tasks"); // Redirect to tasks page after adding task
//     } catch (error) {
//       console.error(" failed:", error);
//     } finally {
//       formik.setSubmitting(false);
//       formik.setValues({
//         taskName: "",
//         taskDescription: "",
//       });
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       taskName: "",
//       taskDescription: "",
//     },

//     onSubmit: addTask,

//     validationSchema: Yup.object().shape({
//       //TODO: Add max Also
//       taskName: Yup.string().required().min(2).max(30),
//       taskDescription: Yup.string().required().min(2).max(255),
//     }),
//   });

//   // const handleChange = (e) => {
//   //   const { target } = e;
//   //   formik.setFieldValue(target.name, target.value);
//   //   console.log(target.value + " " + target.name);
//   // };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div>
//         <div>
//           <button
//             className="h-10 px-6 font-semibold rounded-md bg-black text-white w-[80%] mx-auto md:w-[25rem] m-3"
//             onClick={() => {
//               router.push(`/components/Task/${userId}`);
//             }}
//           >
//             See All Task
//           </button>
//         </div>

//         <div className="border-2 border-black p-5 rounded-md bg-white/10 w-[80%] mx-auto md:w-[25rem]">
//           <form
//             onSubmit={formik.handleSubmit}
//             className="flex flex-col item-center gap-2"
//           >
//             <h1 className="text-center text-xl uppercase pb-3">Add Task</h1>
//             {inputs.map((item, i) => (
//               <Input
//                 item={item}
//                 key={i}
//                 handleChange={formik.handleChange}
//                 formik={formik}
//                 value={formik.values[item.name]}
//               />
//             ))}

//             <button
//               type="submit"
//               className="p-3 mt-2 rounded-md hover:bg-rose-400/70 text-sm bg-rose-400/85 text-white font-bold"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskForm;

"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import Input from "../utils/Input";
import toast from "react-hot-toast";
import NotLoggedInMessage from "../Task/[userId]/NotLoggedInMessage";

const TaskForm = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <NotLoggedInMessage />;
  }
  const router = useRouter();
  const userIdNum = localStorage.getItem("userId");
  const userId = userIdNum.toString();

  const inputs = [
    {
      label: "Task Name",
      type: "text",
      placeholder: "Add Task",
      name: "taskName",
    },
    {
      label: "Task Description",
      type: "text",
      placeholder: "Add Task Description",
      name: "taskDescription",
    },
  ];

  const addTask = async (formData) => {
    try {
      formik.setSubmitting(true);
      formData.taskStatus = false;
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        "http://localhost:9000/api/createTask",
        { formData, userId }
      );

      toast.success("Task Added!");
      const data = response.data;

      // router.push(`/components/Task/${userId}`); // Redirect to tasks page after adding task
    } catch (error) {
      console.error(" failed:", error);
    } finally {
      formik.setSubmitting(false);
      formik.setValues({
        taskName: "",
        taskDescription: "",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      taskName: "",
      taskDescription: "",
    },

    onSubmit: addTask,

    validationSchema: Yup.object().shape({
      taskName: Yup.string().required().min(2).max(30),
      taskDescription: Yup.string().required().min(2).max(255),
    }),
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-teal-200 to-blue-200">
      <div>
        <div>
          <button
            className="h-10 px-6 font-semibold rounded-md bg-teal-600 text-white w-[80%] mx-auto md:w-[25rem] m-3"
            onClick={() => {
              router.push(`/components/Task/${userId}`);
            }}
          >
            See All Task
          </button>
        </div>

        <div className="p-5 rounded-md bg-white w-[80%] mx-auto md:w-[25rem] shadow-md">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col item-center gap-2"
          >
            <h1 className="text-center text-xl uppercase pb-3 text-teal-600 font-bold">
              Add Task
            </h1>
            {inputs.map((item, i) => (
              <Input
                item={item}
                key={i}
                handleChange={formik.handleChange}
                formik={formik}
                value={formik.values[item.name]}
              />
            ))}

            <button
              type="submit"
              className="p-3 mt-2 rounded-md hover:bg-teal-500/70 text-base bg-teal-500/85 text-white font-bold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
