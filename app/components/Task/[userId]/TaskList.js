// import React from "react";
// import { useRouter } from "next/navigation";

// function TaskList({ tasks }) {
//   // // console.log("Hello from here" + tasks);
//   // const handleDelete = (index) => {
//   //   onDeleteTask(index);
//   // };
//   const router = useRouter();
//   const userIdNum = localStorage.getItem("userId");
//   const userId = userIdNum.toString();

//   return (
//     <div>
//       {tasks.map((task, index) => (
//         <div
//           key={index}
//           className=" max-w-md border-2 border-black rounded-md p-4 mb-4"
//           onClick={() => {
//             router.push(`/components/Task/${userId}/${task.taskId}`);
//           }}
//         >
//           <div>
//             <h3 className="text-sm">Task: {index}</h3>
//           </div>
//           <h3 className="font-semibold text-lg">
//             <span>Task Name: </span>
//             {task.taskName}
//           </h3>
//           {/* <p className="text-mdtext-gray-600">
//             <span>Task Description: </span>
//             {task.taskDescription}
//           </p> */}
//           <p className="text-md text-slate-700">
//             Status:{" "}
//             <span
//               className={task.taskStatus ? "text-green-500" : "text-red-500"}
//             >
//               {task.taskStatus ? "Completed" : "Pending"}
//             </span>
//           </p>
//           {/* <button>Delete</button> */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TaskList;

// TaskList.js
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function TaskList({ tasks }) {
  const router = useRouter();
  const userIdNum = localStorage.getItem("userId");
  const userId = userIdNum.toString();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {tasks.map((task, index) => (
        <motion.div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg bg-gradient-to-br from-teal-100/70 to-blue-100/70"
          onClick={() => {
            router.push(`/components/Task/${userId}/${task.taskId}`);
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="p-4">
            <h3 className="text-sm text-gray-600">Task: {index}</h3>
            <h3 className="font-semibold text-lg mt-2">
              <span className="text-gray-800">Task Name: </span>
              {task.taskName}
            </h3>
            <p className="text-md text-gray-700 mt-2">
              Status:{" "}
              <span
                className={task.taskStatus ? "text-green-500" : "text-red-500"}
              >
                {task.taskStatus ? "Completed" : "Pending"}
              </span>
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default TaskList;
