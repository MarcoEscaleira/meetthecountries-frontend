import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
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
  setUser: (user: User) => void;
  resetUser: () => void;
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
      setUser: newUser => set(() => ({ user: newUser })),
      resetUser: () => set(() => ({ user: defaultUser })),
    }),
    {
      name: "user-storage",
    }
  )
);
