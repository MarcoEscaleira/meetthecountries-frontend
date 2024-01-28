import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@state/userStore.ts";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { userId } = useUserStore(state => state.user);

  if (!userId) {
    return <Navigate to="/#login" />;
  }

  return children;
};
