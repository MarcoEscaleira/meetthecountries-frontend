import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@components/Layout/Layout.tsx";
import { ProtectedRoute } from "@pages/ProtectedRoute";
import About from "./About";
import UnhandledError from "./Error";
import Game from "./Game";
import Home from "./Home";
import NotFound from "./NotFound";
import Profile from "./Profile";
import Register from "./Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <UnhandledError />,
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
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
