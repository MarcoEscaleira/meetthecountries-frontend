import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Drawer, Typography } from "@material-tailwind/react";
import { Menu } from "lucide-react";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, setUser, setIsSessionLoading } = useUserStore();
  const isLoggedIn = !!user.userId;

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
          <Menu onClick={() => setIsDrawerOpen(true)} className="h-10 w-8 cursor-pointer sm:w-10" />
        </div>
      </header>

      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} placement="right" className="p-4">
        <div className="flex flex-col items-center justify-between">
          <Typography variant="h3" color="blue-gray">
            Hello explorer!
          </Typography>
          {!isLoggedIn && <Typography color="blue-gray">Get started and login to your account</Typography>}
        </div>
      </Drawer>
      <LoginModal refetchUser={refetch} />
    </>
  );
}
