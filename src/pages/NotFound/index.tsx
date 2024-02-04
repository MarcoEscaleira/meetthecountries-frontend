import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center">
      <img src="/images/astronaut.png" alt="astronaut art figure"/>
      <h2 className="mb-8 text-4xl font-semibold">Oops, page not Found</h2>
      <Link
        to="/"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-base text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700"
      >
        Go back
      </Link>
    </div>
  );
}
