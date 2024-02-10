import { type LoaderFunctionArgs, redirect } from "react-router-dom";
import { gql } from "@generated/gql.ts";
import { useUserStore } from "@state/userStore.ts";
import { apolloClient } from "./apolloSetup.ts";

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

/**
 * Tries to log in the current user if authentication cookie is set and stores it into the user store
 * @return string - for userId or undefined if it fails
 */
const tryUserLogin = async (): Promise<string | undefined> => {
  try {
    const result = await apolloClient.query({ query: GET_USER });

    if (result?.data?.getCurrentlyLoggedInUser) {
      const { id, email, firstName, lastName, dateOfBirth, country, role, createdAt, updatedAt } =
        result?.data.getCurrentlyLoggedInUser;

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
  return undefined;
};

export async function sessionLoader({}: LoaderFunctionArgs) {
  await tryUserLogin();
  return null;
}

export async function protectedRouteLoader({}: LoaderFunctionArgs) {
  if (!(await tryUserLogin())) {
    return redirect("/");
  }
  return null;
}

export async function loggedOutRouteLoader({}: LoaderFunctionArgs) {
  if (await tryUserLogin()) {
    return redirect("/");
  }
  return null;
}
