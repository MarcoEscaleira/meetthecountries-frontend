import { Link } from "react-router-dom";

export default function UnhandledError() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="mb-8 text-4xl font-semibold">Oops, something went wrong</h2>
      <Link
        to="/"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-base text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700"
      >
        Home
      </Link>
    </div>
  );
}
