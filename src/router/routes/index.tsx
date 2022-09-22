import BasicLayout from "@/layouts/BasicLayout";
import { RouteObject, Navigate } from "react-router-dom";
import Overview from "@/pages/Overview";

import NoFoundPage from "@/pages/404";
import User from "@/pages/AuthManage/User";
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Role from '@/pages/AuthManage/Role';
import Menu from '@/pages/AuthManage/Resource/Menu';
import ApiItem from '@/pages/AuthManage/Resource/ApiItem';
import Dictionaries from '@/pages/BaseData/Dictionaries';
import Tourist from '@/pages/AuthManage/Tourist';
import LoginRecords from '@/pages/LoginRecords';

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
          {
            path: "/authManage/role",
            element: <Role />,
          },
          {
            path: "/authManage/tourist",
            element: <Tourist />,
          },
          {
            path: "/authManage/resource",
            children: [
              {
                path: "/authManage/resource/menu",
                element: <Menu />,
              },
              {
                path: "/authManage/resource/apiItem",
                element: <ApiItem />,
              },
            ]
          },
        ],
      },
      {
        path: "/baseData",
        children: [
          {
            path: "/baseData/dictionaries",
            element: <Dictionaries />,
          },
        ],
      },
      {
        path: "/system",
        children: [
          {
            path: "/system/loginRecords",
            element: <LoginRecords />,
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
