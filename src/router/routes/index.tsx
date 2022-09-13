import BasicLayout from "@/layouts/BasicLayout";
import { RouteObject, Navigate } from "react-router-dom";
import Overview from "@/pages/Overview";

import NoFoundPage from "@/pages/404";
import User from "@/pages/AuthManage/User";
import Login from '@/pages/Login';
import Register from '@/pages/Register';

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "/authManage",
        children: [
          {
            path: "/authManage/user",
            element: <User />,
          },
        ],
      },

      {
        path: "/",
        element: <Navigate to={"/overview"} />,
      },
      {
        path: "/*",
        element: <NoFoundPage />,
      },
    ],
  },
];

export default routes;
