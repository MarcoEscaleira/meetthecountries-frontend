import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Button, Drawer, IconButton, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { Menu, Home, Play, FileQuestion, X, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginForm } from "@components/Login/LoginForm.tsx";
import { gql } from "@generated/index.ts";
import { useUserStore } from "@state/userStore.ts";

const LOGOUT_USER = gql(/* GraphQL */ `
  query Query {
    logoutUser
  }
`);

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
  const { user, setUser, setIsSessionLoading, resetUser } = useUserStore();
  const isLoggedIn = !!user.userId;

  const { data, loading, refetch } = useQuery(GET_USER);
  const [makeLogout] = useLazyQuery(LOGOUT_USER);

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

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <>
      <header className="absolute left-0 top-0 z-10 w-full px-4 py-2 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src="/images/mtc-logo.svg" width={58} height={54} alt="Planet Earth" className="" />
          </Link>
          <IconButton onClick={toggleDrawer}>
            <Menu />
          </IconButton>
        </div>
      </header>

      <Drawer open={isDrawerOpen} size={360} onClose={toggleDrawer} placement="right" className="p-4">
        <div className="absolute right-3 top-3">
          <IconButton onClick={() => setIsDrawerOpen(false)} variant="text">
            <X />
          </IconButton>
        </div>

        <div className="flex flex-col items-center">
          <Typography variant="h3" color="blue-gray" textGradient>
            Hello {user.firstName || "explorer"}!
          </Typography>
          {!isLoggedIn && <Typography color="blue-gray">Get started and login to your account</Typography>}

          <List className="mt-8 w-full">
            <Link to="/" onClick={toggleDrawer}>
              <ListItem>
                <ListItemPrefix>
                  <Home />
                </ListItemPrefix>
                Home
              </ListItem>
            </Link>
            <Link to="/game" onClick={toggleDrawer}>
              <ListItem>
                <ListItemPrefix>
                  <Play />
                </ListItemPrefix>
                Game
              </ListItem>
            </Link>
            <Link to="/about" onClick={toggleDrawer}>
              <ListItem>
                <ListItemPrefix>
                  <FileQuestion />
                </ListItemPrefix>
                About
              </ListItem>
            </Link>
            {isLoggedIn && (
              <Link to="/profile" onClick={toggleDrawer}>
                <ListItem>
                  <ListItemPrefix>
                    <CircleUserRound />
                  </ListItemPrefix>
                  Profile
                </ListItem>
              </Link>
            )}
          </List>

          {!isLoggedIn && (
            <LoginForm
              handleLoginSuccess={async () => {
                await refetch();
                toggleDrawer();
              }}
            />
          )}
          {isLoggedIn && (
            <Button
              onClick={async () => {
                await makeLogout();
                resetUser();
                toast.success("Logout successful");
                toggleDrawer();
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </Drawer>
    </>
  );
}
