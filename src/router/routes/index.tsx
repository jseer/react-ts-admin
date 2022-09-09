import BasicLayout from "@/layouts/BasicLayout";
import { RouteObject, Navigate } from "react-router-dom";
import Overview from "@/pages/Overview";

import NoFoundPage from "@/pages/404";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <div />,
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
