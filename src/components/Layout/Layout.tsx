import { Outlet } from "react-router-dom";
import { Footer } from "@components/Footer/Footer.tsx";
import { Header } from "@components/Header/Header.tsx";

export function Layout() {
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
