import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

export interface User {
  userId: number;
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
  userId: 0,
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
    persist(
      set => ({
        user: defaultUser,
        setUser: newUser => set(() => ({ user: newUser })),
        resetUser: () => set(() => ({ user: defaultUser })),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
