import { useEffect } from "react";
import Modal from "react-modal";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@components/Footer/Footer.tsx";
import { Header } from "@components/Header/Header.tsx";

export function Layout() {
  const location = useLocation();
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <>
      <Header />
      <main className="relative flex flex-grow w-full flex-col items-center">
        <Outlet />
      </main>
      {location && location.pathname !== "/" && <Footer />}
    </>
  );
}
