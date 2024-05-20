"use client";

// import React, { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import NotLoggedInMessage from "../NotLoggedInMessage";

// function TaskSingle({ params }) {
//   const accessToken = localStorage.getItem("accessToken");

//   if (!accessToken) {
//     return <NotLoggedInMessage />;
//   }
//   const [taskDetails, setTaskDetails] = useState([]);
//   const router = useRouter();
//   const userIdNum = localStorage.getItem("userId");
//   const userId = userIdNum.toString();

//   useEffect(
//     () => {
//       axios
//         .get(`http://localhost:9000/api/allTask/${params.taskId}`)
//         .then((response) => {
//           setTaskDetails(response.data);
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching task:", error);
//         });
//     },
//     [
//       /* dependencies */
//     ]
//   );

//   const handleDelete = () => {
//     axios
//       .delete(`http://localhost:9000/api/allTask/${params.taskId}`)
//       .then(() => {
//         // console.log("Task deleted successfully");
//         setTaskDetails([]);
//         router.push(`/components/Task/${userId}`);
//       })
//       .catch((error) => {
//         console.error("Error deleting task:", error);
//       });
//   };

//   return (
//     <div className="flex h-screen justify-center items-center">
//       <div className=" max-w-fit min-w-max border-2 border-black rounded-md p-4 mb-4">
//         <h3 className="font-semibold text-lg">
//           <span>Task Name: </span>
//           {taskDetails.taskName}
//         </h3>
//         <p className="text-md text-slate-500">
//           <span>Task Description: </span>
//           {taskDetails.taskDescription}
//         </p>
//         <p className="text-md">
//           Status:{" "}
//           <span
//             className={
//               taskDetails.taskStatus ? "text-green-500" : "text-red-500"
//             }
//           >
//             {taskDetails.taskStatus ? "Completed" : "Pending"}
//           </span>
//         </p>
//         <div className="flex pt-2 text-white">
//           <div className=" bg-cyan-600 p-1 rounded-md m-2">
//             <button
//               className="px-2"
//               onClick={(taskList) => {
//                 router.push(`/components/EditTask/${params.taskId}`);
//               }}
//             >
//               Edit
//             </button>
//           </div>
//           <div className="bg-red-600 p-1 rounded-md m-2">
//             <button className="px-2" onClick={handleDelete}>
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TaskSingle;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NotLoggedInMessage from "../NotLoggedInMessage";
import { motion } from "framer-motion";

function TaskSingle({ params }) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <NotLoggedInMessage />;
  }

  const [taskDetails, setTaskDetails] = useState({});
  const router = useRouter();
  const userIdNum = localStorage.getItem("userId");
  const userId = userIdNum.toString();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/allTask/${params.taskId}`)
      .then((response) => {
        setTaskDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:9000/api/allTask/${params.taskId}`)
      .then(() => {
        setTaskDetails({});
        router.push(`/components/Task/${userId}`);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-teal-200 to-blue-200">
      <motion.div
        className="max-w-md rounded-lg overflow-hidden shadow-md p-4 m-4 bg-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="font-semibold text-lg text-gray-800">
          <span>Task Name: </span>
          {taskDetails.taskName}
        </h3>
        <p className="text-md text-gray-600 break-words">
          <span>Task Description: </span>
          {taskDetails.taskDescription}
        </p>
        <p className="text-md text-gray-700">
          Status:{" "}
          <span
            className={
              taskDetails.taskStatus ? "text-green-500" : "text-red-500"
            }
          >
            {taskDetails.taskStatus ? "Completed" : "Pending"}
          </span>
        </p>
        <div className="flex pt-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-500 p-1 rounded-md m-2"
          >
            <button
              className="px-2 text-white"
              onClick={() => {
                router.push(`/components/EditTask/${params.taskId}`);
              }}
            >
              Edit
            </button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 p-1 rounded-md m-2"
          >
            <button className="px-2 text-white" onClick={handleDelete}>
              Delete
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default TaskSingle;
