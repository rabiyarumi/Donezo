import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";

const UpdateTask = () => {
  const { id } = useParams();
  console.log(id);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    data: task = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/task/${id}`
      );
      return data;
    },
  });
  console.log(task);
  const [newStatus, setNewStatus] = useState(task?.status || "");
  console.log(newStatus)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const status = newStatus;
    const email = user?.email;

    const task = { title, description, status, email };
    console.table(task);

    // save biodata in db
    try {
      // post req
      await axios
        .patch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, task)
        .then((data) => {
          console.log(data);
        });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/')
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[80%] mx-auto my-12">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Title */}
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-black focus:outline-black rounded-md bg-white"
                name="title"
                id="title"
                type="text"
                defaultValue={task?.title}
                placeholder="Title"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-black focus:outline-black rounded-md bg-white"
                name="description"
                id="description"
                type="text"
                defaultValue={task?.description}
                placeholder="Description"
                required
              />
            </div>
            {/* Status */}
            <div className="space-y-1 text-sm">
              <label htmlFor="status" className="block text-gray-600">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                required
              >
                <option value="" disabled selected>
                  Select a Status
                </option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-black md:col-span-2 "
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Save & Continue"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
