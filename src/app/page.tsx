import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Image priority src="/images/planet-earth.svg" width={180} height={180} alt="Planet Earth" className="mb-10" />
      <h1 className="text-4xl font-semibold text-blue-950 mb-4">Meet the Countries</h1>
      <p className="text-lg font-light text-gray-400 text-center px-4 sm:px-0 mb-8">
        Do you dare to come with us on this journey to meet countries never explored?
      </p>
      <div className="flex justify-center items-center gap-6">
        <Link
          href="/map"
          className="inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 shadow-md"
        >
          <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Get started 🚀
          </span>
        </Link>

        <p className="font-light">or</p>

        <Link
          href="/map"
          className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-full transition ease-in duration-200"
        >
          Explore
        </Link>
      </div>
    </div>
  );
}
