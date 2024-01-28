import { useEffect } from "react";
import Modal from "react-modal";
import { Outlet } from "react-router-dom";
import { Footer } from "@components/Footer/Footer.tsx";
import { Header } from "@components/Header/Header.tsx";

export function Layout() {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <>
      <Header />
      <main className="relative flex h-screen w-screen flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
