"use client";
import Image from "next/image";
import Link from "next/link";
import { Map, MapProvider, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  return (
    <MapProvider>
      <Map
        id="quizMap"
        mapboxAccessToken="pk.eyJ1IjoibWFyY29lc2NhbGVpcmFkbXUiLCJhIjoiY2xwN29ldHIwMG16bjJxbXJhZXc5dXUxOSJ9.ZP0gYeYBB-nL5py2RANUOw"
        initialViewState={{
          longitude: 5,
          latitude: 46,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%", position: "relative" }}
        mapStyle="mapbox://styles/marcoescaleiradmu/clp7mzxrf01q701qycptw1thq"
      >
        <section className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 bg-opacity-70 rounded-2xl p-3 w-80 sm:w-auto sm:p-8 flex flex-col items-center justify-center">
          <Image
            priority
            src="/images/planet-earth.svg"
            width={180}
            height={180}
            alt="Planet Earth"
            className="mb-10 w-32 h-32 sm:w-44 sm:h-44"
          />
          <h1 className="text-3xl sm:text-4xl font-semibold text-blue-950 text-center mb-4">Meet the Countries</h1>
          <p className="w-full mb-4 text-base font-light text-black text-center sm:w-2/3 sm:text-lg sm:mb-8">
            Do you dare to come with us on this journey to meet countries never explored?
          </p>
          <div className="flex justify-center items-center gap-6">
            <Link
              href="/game"
              className="inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 shadow-md"
            >
              <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                Get started 🚀
              </span>
            </Link>
          </div>
        </section>

        <NavigationControl position="bottom-right" showCompass />
      </Map>
    </MapProvider>
  );
}
