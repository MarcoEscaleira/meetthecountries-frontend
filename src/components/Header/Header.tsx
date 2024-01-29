import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { LoginModal } from "@components/Login/LoginModal.tsx";
import { gql } from "@generated/index.ts";
import { useUserStore } from "@state/userStore.ts";

const GET_USER = gql(/* GraphQL */ `
  query GetMe {
    getCurrentlyLoggedInUser {
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
`);

export function Header() {
  const { user, setUser, setIsSessionLoading } = useUserStore();

  const { data, loading, refetch } = useQuery(GET_USER);

  useEffect(() => {
    if (!loading) {
      if (data?.getCurrentlyLoggedInUser) {
        const { id, email, firstName, lastName, dateOfBirth, role, createdAt, updatedAt } =
          data.getCurrentlyLoggedInUser;
        setUser({
          userId: id,
          email,
          firstName,
          lastName,
          dateOfBirth: dateOfBirth || "",
          role,
          createdAt,
          updatedAt,
        });
      }

      setIsSessionLoading(false);
    }
  }, [data, loading]);

  return (
    <>
      <header className="absolute left-0 top-0 z-10 w-full px-4 py-2 sm:px-6 sm:py-4">
        <div className="flex items-center justify-end">
          <Link to={user.userId ? "/profile" : "#login"}>
            <UserIcon className="h-10 w-8 cursor-pointer sm:w-10" />
          </Link>
        </div>
      </header>

      <LoginModal refetchUser={refetch} />
    </>
  );
}
