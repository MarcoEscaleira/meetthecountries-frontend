import { useEffect } from "react";
import Modal from "react-modal";
import { Outlet } from "react-router-dom";
// import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { Footer } from "@components/Footer/Footer.tsx";
import { Header } from "@components/Header/Header.tsx";

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
