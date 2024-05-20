"use client";

// * Start??????????????????????????????????

// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Input from "../../utils/Input";
// import TaskList from "../../Task/[userId]/TaskList";
// import checkSession from "@/app/hooks/checkSession";

// const EditForm = ({ params }) => {
//   const [taskDetails, setTaskDetails] = useState([]);
//   const router = useRouter();
//   const userIdNum = localStorage.getItem("userId");
//   const userId = userIdNum.toString();

//   // useEffect(() => {
//   //   checkSession(); // Check session status when component mounts
//   // }, []);

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
//   useEffect(() => {
//     axios
//       .get(`http://localhost:9000/api/allTask/${params.taskId}`)
//       .then((response) => {
//         setTaskDetails(response.data);
//         console.log("Task details:", response.data); // Log task details
//       })
//       .catch((error) => {
//         console.error("Error fetching task:", error);
//       });
//   }, [params.taskId]);

//   const onSubmit = async (formData) => {
//     try {
//       formik.setSubmitting(true);
//       formData.taskStatus = false;
//       // const userId = localStorage.getItem("userId");
//       // console.log(typeof userId);
//       setTaskDetails([]);
//       const response = await axios.put(
//         `http://localhost:9000/api/updateTask/${params.taskId}`,
//         {
//           formData,
//         }
//       );
//       const data = response.data;
//       console.log(data);
//       // Handle success
//       router.push(`/components/Task/${userId}`); // Redirect to tasks page after adding task
//     } catch (error) {
//       console.error(" failed:", error);
//       // Handle error
//     } finally {
//       formik.setSubmitting(false);
//       console.log("hello");
//       formik.setValues({
//         taskName: "",
//         taskDescription: "",
//       });
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       taskName: taskDetails.taskName || "",
//       taskDescription: taskDetails.taskDescription || "",
//     },
//     enableReinitialize: true,
//     onSubmit: onSubmit,
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
//         <div className="border border-gray-600 p-5 rounded-md bg-white/10 w-[80%] mx-auto md:w-[25rem]">
//           <form
//             onSubmit={formik.handleSubmit}
//             className="flex flex-col item-center gap-2"
//           >
//             <h1 className="text-center text-xl uppercase pb-3">Edit Task</h1>
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
//               className="bg-white/20 p-3 mt-2 rounded-md hover:bg-white/40 text-xs"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditForm;

//* End ????????????????????????????????????

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import Input from "../../utils/Input";
import toast from "react-hot-toast";
import NotLoggedInMessage from "../../Task/[userId]/NotLoggedInMessage";

const EditForm = ({ params }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <NotLoggedInMessage />;
  }
  const [taskDetails, setTaskDetails] = useState([]);
  const router = useRouter();
  const userIdNum = localStorage.getItem("userId");
  const userId = userIdNum.toString();
  const [taskStatus, setTaskStatus] = useState(taskDetails.taskStatus || false);

  const handleTaskStatusChange = (value) => {
    setTaskStatus(value);
    formik.setFieldValue("taskStatus", value);
  };

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
  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/allTask/${params.taskId}`)
      .then((response) => {
        setTaskDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
      });
  }, [params.taskId]);

  const onSubmit = async (formData) => {
    try {
      formik.setSubmitting(true);
      formData.taskStatus = taskStatus;
      setTaskDetails([]);
      const response = await axios.put(
        `http://localhost:9000/api/updateTask/${params.taskId}`,
        {
          formData,
        }
      );
      const data = response.data;
      toast.success("Task has been edited.");
      router.push(`/components/Task/${userId}`);
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
      taskName: taskDetails.taskName || "",
      taskDescription: taskDetails.taskDescription || "",
    },
    enableReinitialize: true,
    onSubmit: onSubmit,
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
              Edit Task
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

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="markAsDone"
                  name="markAsDone"
                  value={true}
                  checked={taskStatus === true}
                  onChange={() => handleTaskStatusChange(true)}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="markAsDone"
                  className="ml-2 cursor-pointer text-gray-800"
                >
                  Mark as Done
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="markAsPending"
                  name="markAsDone"
                  value={false}
                  checked={taskStatus === false}
                  onChange={() => handleTaskStatusChange(false)}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="markAsPending"
                  className="ml-2 cursor-pointer text-gray-800"
                >
                  Mark as Pending
                </label>
              </div>
            </div>

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

export default EditForm;
