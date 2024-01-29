import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@state/userStore.ts";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user, isSessionLoading } = useUserStore();

  if (isSessionLoading) {
    // TODO: Create a page loader for protected routes
    return <p>Loading...</p>;
  }

  if (!user.userId && !isSessionLoading) {
    return <Navigate to="/#login" />;
  }

  return children;
};
