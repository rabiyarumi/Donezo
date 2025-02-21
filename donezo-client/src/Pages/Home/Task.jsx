/* eslint-disable react/prop-types */

const Task = ({ task }) => {
  const { title, description, status } = task || {};
  return (
    <div className="border-2 py-4 px-2 mb-2 ">
        <h3>{title}</h3>
        <h4>{status}</h4>
    </div>
  );
};

export default Task;
