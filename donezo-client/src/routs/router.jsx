import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import AddTask from "../Pages/AddTask/AddTask";
import Home from "../Pages/Home/Home";
import UpdateTask from "../Pages/UpdateTask/UpdateTask";
const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute>
        <MainLayout/>
      </PrivateRoute>,
      children:[
        {
          path: "/",
          element: <PrivateRoute>
            <Home/>
          </PrivateRoute>,
        },
        {
          path: "/add-task",
          element: <PrivateRoute>
            <AddTask />
          </PrivateRoute>,
        },
        {
          path: "/update-task/:id",
          element: <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>,
        },
      ]
    },
    
    {
      path: "/login",
      element: <Login/>,
    },
  ]);
  

export default router;