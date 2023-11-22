import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-4xl font-semibold mb-8">Oops, page not Found</h2>
      <Link
        href="/"
        className="py-2 px-4 bg-indigo-600 text-white text-center text-base shadow-md rounded-lg transition ease-in duration-200 hover:bg-indigo-700"
      >
        Home
      </Link>
    </div>
  );
}
