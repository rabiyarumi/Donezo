import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute>
        <MainLayout/>
      </PrivateRoute>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ]);
  

export default router;