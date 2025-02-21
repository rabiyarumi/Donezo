import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Task from "./Task";

const AllTasks = () => {
  const { user } = useAuth();
  const { data: tasks = [], isLoading, refetch } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/tasks/${user?.email}`
      );
      return data;
    },
  });

  const handleDelete = async (id) => {
    console.log(id)
   const {data} =await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`)
    console.log(data)
    refetch()
  }

  console.log(tasks);
  return (
    <div className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* To Do Column */}
        <div className="">
          <h2 className="text-2xl font-bold mb-2">To Do</h2>
          {tasks
            .filter((task) => task?.status === "To Do")
            .map((task) => (
              <Task key={task?._id} task={task} handleDelete={handleDelete} />
            ))}
        </div>
        {/* In Progress Column */}
        <div>
          <h2 className="text-2xl font-bold mb-2">In Progress</h2>
          {tasks
            .filter((task) => task?.status === "In Progress")
            .map((task) => (
              <Task key={task?._id} task={task} handleDelete={handleDelete}/>
            ))}
        </div>
        {/* To Do Column */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Done</h2>
          {tasks
            .filter((task) => task?.status === "Done")
            .map((task) => (
              <Task key={task?._id} task={task} handleDelete={handleDelete}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
