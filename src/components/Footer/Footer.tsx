import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 flex w-full justify-center">
      <section className="container flex items-center justify-between p-6 sm:p-4">
        <Link to="/">
          <img src="/images/mtc-logo.svg" width={58} height={54} alt="Planet Earth" className="" />
        </Link>

        <nav className="flex flex-grow justify-center">
          <Link to="/about" className="text-sky-400 underline">
            About
          </Link>
        </nav>

        <span></span>
      </section>
    </footer>
  );
}
