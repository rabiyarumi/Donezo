import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Task from "./Task";
import {closestCorners, DndContext} from "@dnd-kit/core"
import {arrayMove,  SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

const AllTasks = () => {
  const { user } = useAuth();
  const { data:fetchedTasks = [], isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/tasks/${user?.email}`
      );
      return data;
    },
  });

   // Sync state with fetched tasks
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(fetchedTasks);
  }, [fetchedTasks]); // Update tasks only when fetched data changes


  // Handle delete
  const handleDelete = async (id) => {
   const {data} =await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`)
    console.log(data)
    refetch()
  }

  // const getTaskPos = id => tasks.findIndex(task => task._id === id)


  // const handleDragEnd = event => {
  //   const {active, over} = event
    
  //   if(!over || active.id === over.id) return;
  //   setTasks(tasks => {
  //     const originalPos = getTaskPos(active.id)
  //     const newPos = getTaskPos(over.id)
  //     return arrayMove(tasks, originalPos, newPos)
  //   })
    
  // }


   // Handle drag and drop across columns
   const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((task) => task._id === activeId);
    const overTask = tasks.find((task) => task._id === overId);

    if (!activeTask || !overTask) return;

    // If the task is dropped into a different column, update its status
    if (activeTask.status !== overTask.status) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === activeId ? { ...task, status: overTask.status } : task
        )
      );
    } else {
      // Reorder within the same column
      setTasks((prevTasks) => {
        const columnTasks = prevTasks.filter((task) => task.status === activeTask.status);
        const originalPos = columnTasks.findIndex((t) => t._id === activeId);
        const newPos = columnTasks.findIndex((t) => t._id === overId);
        return arrayMove(prevTasks, originalPos, newPos);
      });
    }
  };

  // Group tasks by status
  const columns = [
    { title: "To Do", status: "To Do" },
    { title: "In Progress", status: "In Progress" },
    { title: "Done", status: "Done" },
  ];


  console.log(tasks);
  return (
    <div className="my-8">
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map(({ title, status }) => (
            <div key={status}>
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <SortableContext
                items={tasks.filter((task) => task.status === status).map((task) => task._id)}
                strategy={verticalListSortingStrategy}
              >
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <Task key={task._id} id={task._id} task={task} handleDelete={handleDelete} />
                  ))}
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default AllTasks;
