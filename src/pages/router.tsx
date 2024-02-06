import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@components/Layout/Layout.tsx";
import NotFound from "@pages/NotFound";
import UnhandledError from "./Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <UnhandledError />,
    children: [
      {
        index: true,
        lazy: () => import("./Home"),
      },
      {
        path: "/game",
        lazy: () => import("./Game"),
      },
      {
        path: "/register",
        lazy: () => import("./Register"),
      },
      {
        path: "/profile",
        lazy: () => import("./Profile"),
      },
      {
        path: "/about",
        lazy: () => import("./About"),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
