import { Typography } from "@material-tailwind/react";
import { Map, MapProvider } from "react-map-gl";
import { Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS } from "@utils/constants.ts";

export function Component() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return (
    <MapProvider>
      <Map
        id="quizMap"
        mapboxAccessToken={__MAPBOX_TOKEN__}
        attributionControl={false}
        initialViewState={{
          longitude: 5,
          latitude: 46,
          zoom: breakpoint === "mobile" ? 1.8 : 2.5,
        }}
        style={{ width: "100%", height: "100vh", position: "relative" }}
        mapStyle="mapbox://styles/marcoescaleiradmu/clp7mzxrf01q701qycptw1thq"
      >
        <section className="absolute left-1/2 top-1/2 flex w-80 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-2xl bg-gray-100 bg-opacity-90 p-3 sm:w-[450px] sm:p-8 md:w-[600px]">
          <img
            src="/images/mtc-logo.svg"
            width={180}
            height={180}
            alt="Planet Earth MTC"
            className="mb-6 size-32 sm:mb-8 sm:size-44"
          />
          <Typography variant="lead" className="mb-6 text-center text-sm sm:mb-8 sm:text-lg">
            Embark on an exciting journey with us to explore uncharted territories and discover countries like never
            before.
            <Typography className="mt-3 font-medium">Are you ready for the adventure?</Typography>
          </Typography>
          <div className="flex items-center justify-center">
            <Link
              to="/game"
              className="group inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 text-sm font-medium text-gray-900 shadow-md hover:text-white focus:outline-none focus:ring-4 focus:ring-green-200 group-hover:from-green-400 group-hover:to-blue-600"
              data-cy="get-started"
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
