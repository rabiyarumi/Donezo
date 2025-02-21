/* eslint-disable react/prop-types */

const Task = ({ task , handleDelete={handleDelete}}) => {
  const {_id, title, description, status } = task || {};
//   console.log(_id)
  return (
    <div className="border-2 py-4 px-2 mb-2 ">
        <h3>{title}</h3>
        <h4>{status}</h4>
        <button className="p-2 rounded-2xl bg-black text-white cursor-pointer" onClick={() => handleDelete(_id)}>Delete</button>

    </div>
  );
};

export default Task;
