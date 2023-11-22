import Image from "next/image";
import planetEarth from "../../public/images/planet-earth.svg";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Image priority src={planetEarth} alt="Planet Earth" className="pb-8" />
      <h1 className="text-4xl font-semibold text-blue-950">Meet the Countries</h1>
      <p className="text-lg font-light text-gray-400 text-center px-4 sm:px-0">
        Do you dare to come with us on this journey to meet countries never explored?
      </p>
    </div>
  );
}
