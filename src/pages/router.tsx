import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@components/Layout/Layout.tsx";
import NotFound from "@pages/NotFound";
import { loggedOutRouteLoader, protectedRouteLoader, sessionLoader } from "@utils/routeLoaders.ts";
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
        path: "/game/quiz/:quizId",
        lazy: () => import("./Quiz"),
      },
      {
        path: "/game/quiz/:quizId/attempt/:attemptId",
        lazy: () => import("./QuizResult"),
      },
      {
        path: "/register",
        loader: loggedOutRouteLoader,
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
