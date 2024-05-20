"use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useSignOut } from "@/app/hooks/useSignOut";
// import NotLoggedInMessage from "./NotLoggedInMessage";
// import TaskList from "./TaskList";

// function ShowTasks({ params }) {
//   const [listTask, setListTask] = useState([]);
//   const [userName, setUserName] = useState("");
//   const router = useRouter();
//   const handleSignOut = useSignOut();

//   const accessToken = localStorage.getItem("accessToken");

//   if (!accessToken) {
//     return <NotLoggedInMessage />;
//   }

//   useEffect(() => {
//     axios
//       .post("http://localhost:9000/api/checkSession", { token: accessToken })
//       .then((response) => {
//         // console.log(response.data.subject);
//         setUserName(response.data.subject);
//       })
//       .catch((error) => {
//         handleSignOut();
//         router.push("/components/Login");
//       });
//   }, []);

//   useEffect(
//     () => {
//       axios
//         .get(`http://localhost:9000/api/allTaskList/${params.userId}`)
//         .then((response) => {
//           // console.log(response.data);
//           setListTask(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching tasks:", error);
//         });
//     },
//     [
//       /* dependencies */
//     ]
//   );

//   return (
//     <div className="flex justify-center pt-3">
//       <div className="max-w-screen-lg w-4/5">
//         <div className="flex justify-between w-4/5 font-bold text-3xl mb-6">
//           <div>
//             <p>Welcome {userName}</p>
//           </div>
//           <div className="font-bold text-2xl pt-3">
//             <button
//               className="h-10 px-6 font-semibold rounded-md bg-black text-white"
//               onClick={handleSignOut}
//             >
//               LogOut
//             </button>
//           </div>
//         </div>
//         {/* <div>
//           <TaskForm handleAddTask={handleAddTask}/>
//         </div> */}
//         <div className="pt-3 font-bold text-2xl p-3 flex justify-between max-w-md">
//           <div>
//             <p>Tasks</p>
//           </div>
//           <div>
//             <button
//               className="h-10 px-6 font-semibold rounded-md bg-black text-white"
//               onClick={() => {
//                 router.push("/components/AddTask");
//               }}
//             >
//               AddTask
//             </button>
//           </div>
//         </div>
//         <div>
//           <TaskList tasks={listTask} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShowTasks;

// ShowTasks.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSignOut } from "@/app/hooks/useSignOut";
import NotLoggedInMessage from "./NotLoggedInMessage";
import TaskList from "./TaskList";

function ShowTasks({ params }) {
  const [listTask, setListTask] = useState([]);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const handleSignOut = useSignOut();

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <NotLoggedInMessage />;
  }

  useEffect(() => {
    axios
      .post("http://localhost:9000/api/checkSession", { token: accessToken })
      .then((response) => {
        setUserName(response.data.subject);
      })
      .catch((error) => {
        handleSignOut();
        router.push("/components/Login");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/allTaskList/${params.userId}`)
      .then((response) => {
        setListTask(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [params.userId]);

  return (
    <div className="flex justify-center pt-10 bg-gradient-to-br from-teal-200 to-blue-200 min-h-screen">
      <div className="max-w-screen-lg w-4/5 bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-teal-500">
            Welcome, {userName}
          </h1>
          <button
            className="h-10 px-6 font-semibold rounded-md bg-red-400 text-white transition duration-300 hover:bg-red-500"
            onClick={handleSignOut}
          >
            Log Out
          </button>
        </div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-teal-600">Tasks</h2>
          <button
            className="h-10 px-6 font-semibold rounded-md bg-teal-600 text-white transition duration-300 hover:bg-teal-700"
            onClick={() => router.push("/components/AddTask")}
          >
            Add Task
          </button>
        </div>
        <TaskList tasks={listTask} />
      </div>
    </div>
  );
}

export default ShowTasks;
