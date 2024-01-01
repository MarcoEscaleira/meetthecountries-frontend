"use client";
import Image from "next/image";
import Link from "next/link";
import { Map, MapProvider } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  return (
    <MapProvider>
      <Map
        id="quizMap"
        mapboxAccessToken="pk.eyJ1IjoibWFyY29lc2NhbGVpcmFkbXUiLCJhIjoiY2xwN29ldHIwMG16bjJxbXJhZXc5dXUxOSJ9.ZP0gYeYBB-nL5py2RANUOw"
        attributionControl={false}
        initialViewState={{
          longitude: 5,
          latitude: 46,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%", position: "relative" }}
        mapStyle="mapbox://styles/marcoescaleiradmu/clp7mzxrf01q701qycptw1thq"
      >
        <section className="absolute left-1/2 top-1/2 flex w-80 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-2xl bg-gray-100 bg-opacity-70 p-3 sm:w-auto sm:p-8">
          <Image
            priority
            src="/images/planet-earth.svg"
            width={180}
            height={180}
            alt="Planet Earth"
            className="mb-10 h-32 w-32 sm:h-44 sm:w-44"
          />
          <h1 className="mb-4 text-center text-3xl font-semibold text-blue-950 sm:text-4xl">Meet the Countries</h1>
          <p className="mb-4 w-full text-center text-base font-light text-black sm:mb-8 sm:w-2/3 sm:text-lg">
            Do you dare to come with us on this journey to meet countries never explored?
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/game"
              className="group inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 text-sm font-medium text-gray-900 shadow-md hover:text-white focus:outline-none focus:ring-4 focus:ring-green-200 group-hover:from-green-400 group-hover:to-blue-600"
            >
              <span className="rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
                Get started 🚀
              </span>
            </Link>
          </div>
        </section>
      </Map>
    </MapProvider>
  );
}
