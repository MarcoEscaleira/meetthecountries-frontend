import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Analytics } from "@vercel/analytics/react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { router } from "@pages/router.tsx";
import { apolloClient } from "@utils/apolloSetup.ts";
import UnhandledError from "pages/Error";
import "./global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} fallbackElement={<UnhandledError />} />
    </ApolloProvider>

    <ToastContainer position="bottom-center" />
    <Analytics />
  </React.StrictMode>
);
