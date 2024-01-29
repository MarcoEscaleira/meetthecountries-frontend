import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User;
  isSessionLoading: boolean;
  setUser: (user: User) => void;
  resetUser: () => void;
  setIsSessionLoading: (session: boolean) => void;
}

const defaultUser = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  role: "",
  createdAt: "",
  updatedAt: "",
};

export const useUserStore = create<UserState>()(
  devtools(
    set => ({
      user: defaultUser,
      isSessionLoading: true,
      setUser: newUser => set(() => ({ user: newUser })),
      resetUser: () => set(() => ({ user: defaultUser })),
      setIsSessionLoading: isSessionLoading => set(() => ({ isSessionLoading })),
    }),
    {
      name: "user-storage",
    }
  )
);
