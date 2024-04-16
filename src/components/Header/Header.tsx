import { useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import useDetectScroll, { Axis } from "@smakss/react-scroll-direction";
import { format } from "date-fns";
import { ChevronRight, CircleUserRound, FileQuestion, Home, LibraryBig, Menu, Play, Power, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useBreakpoint from "use-breakpoint";
import { LoginForm } from "@components/Login/LoginForm.tsx";
import { useUserStore } from "@state/userStore.ts";
import { BREAKPOINTS } from "@utils/constants.ts";
import { LOGOUT_USER } from "@utils/queries/Logout.ts";
import { QUIZ_OF_THE_DAY } from "@utils/queries/QuizOfTheDay.ts";

export function Header() {
  // const { notifications, clear, markAllAsRead, markAsRead, add, update, remove, find, sort, unreadCount } =
  //   useNotificationCenter();
  const {
    scrollPosition: { top },
  } = useDetectScroll({ axis: Axis.Y });
  const location = useLocation();
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, isLoggedIn, isAdmin, resetUser } = useUserStore();

  const { data: quizOfDay, loading: isLoadingQuizOfDay } = useQuery(QUIZ_OF_THE_DAY);
  const [makeLogout, { client }] = useLazyQuery(LOGOUT_USER);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const isHome = location.pathname === "/";
  const todayDate = format(new Date(), "dd/MM");

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-10 w-full px-2 py-2 sm:px-6 sm:py-4 md:px-4 ${isHome ? "bg-transparent" : "bg-white"} ${top > 5 ? "shadow" : ""}`}
      >
        <div className="flex items-center justify-between">
          <Tooltip content="Home">
            <Link to="/">
              <img src="/images/planet-earth.svg" alt="Planet Earth" className="size-[44px] md:size-[54px]" />
            </Link>
          </Tooltip>
          <div className="flex h-full items-center gap-3">
            {isLoggedIn && (
              <div className="flex items-center gap-2">
                <Typography className="flex font-medium">
                  <Typography as="span">Hello,</Typography>&nbsp;{user.firstName}
                </Typography>
                <CircleUserRound className="size-7 md:size-8" />
              </div>
            )}
            <IconButton onClick={toggleDrawer} aria-label="Menu" data-cy="menu-toggle">
              {isDrawerOpen ? <X className="stroke-2" /> : <Menu className="stroke-2" />}
            </IconButton>
          </div>
        </div>
      </header>

      <Drawer
        open={isDrawerOpen}
        size={breakpoint === "mobile" ? 360 : 420}
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
              <img src="/images/planet-earth.svg" width={58} height={54} alt="Planet Earth" className="" />
            </Link>
            <div className="flex flex-col ">
              <Typography variant="h3" color="blue-gray" className="font-medium">
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
                    client.resetStore();
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

          {!isLoadingQuizOfDay && quizOfDay && (
            <section className="mt-4 w-full border-t pt-2">
              <Button
                variant="text"
                className="flex w-full items-center justify-between"
                onClick={() => {
                  navigate(`/game/quiz/${quizOfDay?.quizOfTheDay.id}`);
                  toggleDrawer();
                }}
              >
                <Typography variant="h4" color="blue-gray" className="text-xl font-medium">
                  Quiz of the day ({todayDate})
                </Typography>
                <ChevronRight />
              </Button>
            </section>
          )}
        </div>
      </Drawer>
    </>
  );
}
