import { useEffect } from "react";
import Modal from "react-modal";
import { LoaderFunctionArgs, Outlet, redirect } from "react-router-dom";
import { Footer } from "@components/Footer/Footer.tsx";
import { Header } from "@components/Header/Header.tsx";
import { gql } from "@generated/gql.ts";
import { useUserStore } from "@state/userStore.ts";
import { apolloClient } from "@utils/apolloSetup.ts";
// import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

const GET_USER = gql(/* GraphQL */ `
  query GetMe {
    getCurrentlyLoggedInUser {
      id
      email
      firstName
      lastName
      dateOfBirth
      country
      role
      createdAt
      updatedAt
    }
  }
`);

export async function sessionLoader({}: LoaderFunctionArgs) {
  try {
    const result = await apolloClient.query({ query: GET_USER });

    if (result?.data?.getCurrentlyLoggedInUser) {
      const { id, email, firstName, lastName, dateOfBirth, country, role, createdAt, updatedAt } =
        result?.data.getCurrentlyLoggedInUser;

      console.log("here 1");

      useUserStore.getState().setUser({
        userId: id,
        email,
        firstName,
        lastName: lastName || "",
        dateOfBirth: dateOfBirth || "",
        country: country || "",
        role: role,
        createdAt,
        updatedAt,
      });
      return id;
    }
  } catch (e) {}
  return null;
}

export async function protectedRouteLoader({}: LoaderFunctionArgs) {
  console.log("here 2");
  if (!useUserStore.getState().user.userId) {
    return redirect("/");
  }
  return null;
}

export function Layout() {
  // const { notifications, clear, markAllAsRead, markAsRead, add, update, remove, find, sort, unreadCount } =
  //   useNotificationCenter();

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <>
      <Header />
      <main className="relative flex h-screen w-screen flex-col items-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
