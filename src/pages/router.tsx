import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@components/Layout/Layout.tsx";
import NotFound from "@pages/NotFound";
import { nonLoggedInRouteLoader, protectedRouteLoader, sessionLoader } from "@utils/routeLoaders.ts";
import UnhandledError from "./Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: sessionLoader,
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
        loader: nonLoggedInRouteLoader,
        lazy: () => import("./Register"),
      },
      {
        path: "/profile",
        loader: protectedRouteLoader,
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
