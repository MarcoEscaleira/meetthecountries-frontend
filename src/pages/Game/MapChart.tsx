import { FC, Fragment, useState } from "react";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { geoCentroid } from "d3-geo";
import { Minus, Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ZoomableGroup, ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS } from "@utils/constants.ts";
import { useCountryInformation } from "@utils/hooks/useCountryInformation";

interface Position {
  coordinates: Array<number>;
  zoom: number;
}

export const MapChart: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [position, setPosition] = useState<Position>({ coordinates: [5, 46], zoom: 1 });
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { countriesPassedBy, countryColours } = useCountryInformation();

  function handleZoomIn() {
    if (position.zoom >= 10) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position: Position) {
    setPosition(position);
  }

  return (
    <div className="relative w-full">
      <div className="border-2">
        <ComposableMap
          projectionConfig={{
            scale: 2000,
            center: [0, 0],
          }}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "600px",
          }}
          onClick={() => {
            setSearchParams({
              country: "",
            });
          }}
        >
          {/* @ts-expect-error: due to a temporary update on the @types/react */}
          <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
            {/* @ts-expect-error: due to a temporary update on the @types/react */}
            <Geographies geography="/features.json">
              {({ geographies }) =>
                geographies.map(geo => {
                  const provinceCenter = geoCentroid(geo);
                  // const isCountrySelected = searchParams.get("country") === geo.properties.name;
                  const countryColor = countryColours[geo.properties.name] || "fill-blue-gray-200";

                  const handleOnCountryClick = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
                    event.stopPropagation();

                    const country = geo.properties.name;
                    if (searchParams.get("country") === country) {
                      setSearchParams({
                        country: "",
                      });
                    } else {
                      setSearchParams({
                        country,
                      });
                    }
                  };

                  return (
                    <Fragment key={geo.rsmKey}>
                      <Tooltip content={geo.properties.name}>
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          data-tooltip-id="country-tooltip"
                          onClick={handleOnCountryClick}
                          className={`${countryColor} cursor-pointer outline-none hover:fill-blue-200`}
                        />
                      </Tooltip>
                      <Marker key={`name-${geo.rsmKey}`} coordinates={provinceCenter} onClick={handleOnCountryClick}>
                        {/* @ts-expect-error: text not found in svg */}
                        <text
                          textAnchor="middle"
                          fill="black"
                          strokeWidth={0}
                          fontSize={breakpoint === "mobile" ? "15px" : "10px"}
                          cursor="pointer"
                        >
                          {geo.properties.name}
                        </text>
                      </Marker>
                    </Fragment>
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div className="absolute right-2 top-0 mt-3 flex items-center gap-2 md:right-4 md:gap-3">
        <Tooltip content="Zoom in">
          <Button onClick={handleZoomIn} size="sm" className="p-2">
            <Plus className="size-4 md:size-6" />
          </Button>
        </Tooltip>
        <Tooltip content="Zoom out">
          <Button onClick={handleZoomOut} size="sm" className="p-2">
            <Minus className="size-4 md:size-6" />
          </Button>
        </Tooltip>
      </div>

      <div className="absolute -bottom-7 left-0 flex items-center gap-3 sm:gap-6 md:left-4 ">
        <Tooltip content="Completed all quizzes">
          <div className="flex gap-2">
            <span className="size-5 rounded-full bg-green-400" />
            <Typography variant="small" className="font-medium">
              Completed
            </Typography>
          </div>
        </Tooltip>
        <Tooltip content="Completed some quizzes">
          <div className="flex gap-2">
            <span className="size-5 rounded-full bg-yellow-200" />
            <Typography variant="small" className="font-medium">
              In Progress
            </Typography>
          </div>
        </Tooltip>
        <Tooltip content="No quizzes attempted or no quizzes available">
          <div className="flex gap-2">
            <span className="size-5 rounded-full bg-blue-gray-200" />
            <Typography variant="small" className="font-medium">
              None
            </Typography>
          </div>
        </Tooltip>
      </div>

      <div className="absolute -bottom-14 left-0 flex items-center md:left-4">
        <Tooltip content="Current selected country">
          <div className="flex gap-2">
            <Typography variant="small" className="font-medium">
              {countriesPassedBy} countries completed out of 202
            </Typography>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
