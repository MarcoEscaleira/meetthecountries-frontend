import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Drawer, IconButton, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { Menu, Home, Play, FileQuestion, X, CircleUserRound, Power, LibraryBig } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useBreakpoint from "use-breakpoint";
import { LoginForm } from "@components/Login/LoginForm.tsx";
import { Roles } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";
import { BREAKPOINTS } from "@utils/constants.ts";
import { LOGOUT_USER } from "@utils/queries/Logout.ts";

export function Header() {
  // const { notifications, clear, markAllAsRead, markAsRead, add, update, remove, find, sort, unreadCount } =
  //   useNotificationCenter();
  const location = useLocation();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, isLoggedIn, resetUser } = useUserStore();
  const isAdmin = user.role === Roles.Admin;

  const [makeLogout] = useLazyQuery(LOGOUT_USER);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const isHome = location.pathname === "/";

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-10 w-full px-2 py-2 sm:px-6 sm:py-4 md:px-4 ${isHome ? "bg-transparent" : "bg-white"}`}
      >
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src="/images/mtc-logo.svg" alt="Planet Earth" className="h-[44px] w-[48px] md:h-[54px] md:w-[58px]" />
          </Link>
          <div className="flex h-full items-center gap-3">
            {isLoggedIn && (
              <div className="flex items-center gap-2">
                <Typography className="flex font-medium">
                  <Typography as="span">Hello,</Typography>&nbsp;{user.firstName}
                </Typography>
                <CircleUserRound className="h-7 w-7 md:h-8 md:w-8" />
              </div>
            )}
            <IconButton onClick={toggleDrawer}>
              {isDrawerOpen ? <X className="stroke-2" /> : <Menu className="stroke-2" />}
            </IconButton>
          </div>
        </div>
      </header>

      <Drawer
        open={isDrawerOpen}
        size={360}
        onClose={toggleDrawer}
        placement={breakpoint === "mobile" ? "left" : "right"}
        className="p-4"
      >
        <div className="absolute right-2 top-2">
          <IconButton onClick={() => setIsDrawerOpen(false)} variant="text">
            <X />
          </IconButton>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex w-full items-center space-x-5 border-b pb-4">
            <Link to="/">
              <img src="/images/mtc-logo.svg" width={58} height={54} alt="Planet Earth" className="" />
            </Link>
            <div className="flex flex-col ">
              <Typography variant="h3" color="blue-gray">
                Hello {user.firstName || "explorer"}!
              </Typography>
              {!isLoggedIn && <Typography color="blue-gray">Get started and login to your account</Typography>}
            </div>
          </div>

          <List className="mt-4 w-full">
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
              <>
                <Link to="/profile" onClick={toggleDrawer}>
                  <ListItem>
                    <ListItemPrefix>
                      <CircleUserRound />
                    </ListItemPrefix>
                    Profile
                  </ListItem>
                </Link>
                {isAdmin && (
                  <Link to="/quizzes" onClick={toggleDrawer}>
                    <ListItem>
                      <ListItemPrefix>
                        <LibraryBig />
                      </ListItemPrefix>
                      Manage Quizzes
                    </ListItem>
                  </Link>
                )}
                <ListItem
                  onClick={async () => {
                    await makeLogout();
                    resetUser();
                    toast.success("Logout successful");
                    toggleDrawer();
                  }}
                >
                  <ListItemPrefix>
                    <Power />
                  </ListItemPrefix>
                  Log Out
                </ListItem>
              </>
            )}
          </List>

          {!isLoggedIn && <LoginForm toggleDrawer={toggleDrawer} />}
        </div>
      </Drawer>
    </>
  );
}
