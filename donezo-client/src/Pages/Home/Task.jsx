/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task , id, handleDelete}) => {
    
  const {_id, title, description, status } = task || {};
  const navigate = useNavigate()
//   console.log(_id)

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: _id})

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}  className="border-2 py-4 px-2 mb-2 ">
        <h3>{title}</h3>
        <h4>{status}</h4>
        <button className="p-2 rounded-2xl bg-black text-white cursor-pointer" onClick={() => handleDelete(_id)}>Delete</button>
        <button className="p-2 rounded-2xl bg-black text-white cursor-pointer" onClick={() =>navigate(`/update-task/${_id}`) }>update</button>


    </div>
  );
};

export default Task;
