import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../Pages/Login/Login";
const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ]);
  

export default router;