import React from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-tailwind/react";
import { Analytics } from "@vercel/analytics/react";
import { Loader2 } from "lucide-react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { router } from "@pages/router.tsx";
import { apolloClient } from "@utils/apolloSetup.ts";
import "./global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        {/* @ts-expect-error: due to a temporary update on the @types/react */}
        <RouterProvider
          router={router}
          fallbackElement={
            <div className="flex h-screen w-full items-center justify-center">
              <Loader2 size={100} className="animate-spin" />
            </div>
          }
        />
      </ThemeProvider>
    </ApolloProvider>

    <ToastContainer position="bottom-center" />
    <Analytics />
  </React.StrictMode>
);
