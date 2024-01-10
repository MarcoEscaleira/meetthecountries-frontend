"use client";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { LoginModal } from "@/components";
import { useUserStore } from "@/state";

const GET_USER = gql`
  query GetMe {
    getCurrentlyLoggedInUser {
      status
      user {
        id
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
`;

export function Header() {
  const { user, setUser } = useUserStore();

  const { data, loading, refetch } = useQuery(GET_USER);

  useEffect(() => {
    if (data?.getCurrentlyLoggedInUser?.status === "success") {
      const user = data.getCurrentlyLoggedInUser.user;
      setUser({
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
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
