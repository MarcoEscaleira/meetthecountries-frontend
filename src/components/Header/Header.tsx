"use client";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { gql } from "@/__generated__";
import { LoginModal } from "@/components";
import { useUserStore } from "@/state";

const GET_USER = gql(/* GraphQL */ `
  query GetMe {
    getCurrentlyLoggedInUser {
      status
      user {
        _id
        email
        firstName
        lastName
        dateOfBirth
        role
        createdAt
        updatedAt
      }
    }
  }
`);

export function Header() {
  const { user, setUser } = useUserStore();

  const { data, loading, refetch } = useQuery(GET_USER);

  useEffect(() => {
    if (data?.getCurrentlyLoggedInUser?.status === "success") {
      const { _id, email, firstName, lastName, dateOfBirth, role, createdAt, updatedAt } =
        data.getCurrentlyLoggedInUser.user;
      setUser({
        userId: _id,
        email,
        firstName,
        lastName,
        dateOfBirth,
        role,
        createdAt,
        updatedAt,
      });
    }
  }, [data, loading]);

  return (
    <>
      <header className="absolute left-0 top-0 z-10 w-full px-4 py-2 sm:px-6 sm:py-4">
        <div className="flex items-center justify-end">
          <Link href={user.userId ? "/profile" : "#login"}>
            <UserIcon className="h-10 w-8 cursor-pointer sm:w-10" />
          </Link>
        </div>
      </header>

      <LoginModal refetchUser={refetch} />
    </>
  );
}
