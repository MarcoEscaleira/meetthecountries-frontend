import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@components/Layout/Layout.tsx";
import About from "./about";
import Game from "./game";
import Home from "./home";
import NotFound from "./notFound";
import Profile from "./profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/game",
        element: <Game />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
