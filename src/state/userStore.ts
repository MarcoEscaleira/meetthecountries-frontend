import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  resetUser: () => void;
}

const defaultUser = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  country: "",
  role: "",
  createdAt: "",
  updatedAt: "",
};

export const useUserStore = create<UserState>()(
  devtools(
    set => ({
      user: defaultUser,
      isLoggedIn: false,
      setUser: newUser => set(() => ({ user: newUser, isLoggedIn: true })),
      resetUser: () => set(() => ({ user: defaultUser, isLoggedIn: false })),
    }),
    {
      name: "user-storage",
    }
  )
);
