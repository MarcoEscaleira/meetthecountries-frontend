import { Link } from "react-router-dom";
import { Header, Footer } from "@components/index";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex w-full flex-grow flex-col items-center">
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          <img src="/images/astronaut.png" alt="astronaut art figure" />
          <h2 className="mb-8 px-4 text-center text-4xl font-semibold md:px-0">Oops, page not Found</h2>
          <Link
            to="/"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-base text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700"
          >
            Go back
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
