/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const Task = ({ task , handleDelete={handleDelete}}) => {
    
  const {_id, title, description, status } = task || {};
  const navigate = useNavigate()
//   console.log(_id)
  return (
    <div className="border-2 py-4 px-2 mb-2 ">
        <h3>{title}</h3>
        <h4>{status}</h4>
        <button className="p-2 rounded-2xl bg-black text-white cursor-pointer" onClick={() => handleDelete(_id)}>Delete</button>
        <button className="p-2 rounded-2xl bg-black text-white cursor-pointer" onClick={() =>navigate(`/update-task/${_id}`) }>update</button>


    </div>
  );
};

export default Task;
