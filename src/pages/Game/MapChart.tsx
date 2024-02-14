import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { Button } from "@material-tailwind/react";
import { geoCentroid } from "d3-geo";
import { Minus, Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ZoomableGroup, ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

interface Position {
  coordinates: Array<number>;
  zoom: number;
}

export const MapChart: FC<{
  setTooltipContent: Dispatch<SetStateAction<string>>;
}> = ({ setTooltipContent }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [position, setPosition] = useState<Position>({ coordinates: [5, 46], zoom: 1 });

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
      <div className="border-b-2 border-t-2">
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
        >
          {/* @ts-expect-error: due to a temporary update on the @types/react */}
          <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
            {/* @ts-expect-error: due to a temporary update on the @types/react */}
            <Geographies geography="/features.json">
              {({ geographies }) =>
                geographies.map(geo => {
                  const provinceCenter = geoCentroid(geo);
                  const isCountrySelected = searchParams.get("country") === geo.properties.name;

                  return (
                    <Fragment key={geo.rsmKey}>
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        data-tooltip-id="country-tooltip"
                        onClick={() => {
                          setSearchParams({
                            country: geo.properties.name,
                          });
                        }}
                        onMouseEnter={() => {
                          setTooltipContent(geo.properties.name);
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                        className={`${isCountrySelected ? "fill-blue-400" : "fill-blue-gray-200"} hover:fill-blue-300 cursor-pointer outline-none`}
                      />
                      <Marker
                        key={`name-${geo.rsmKey}`}
                        coordinates={provinceCenter}
                        onMouseEnter={() => {
                          setTooltipContent(geo.properties.name);
                        }}
                        onClick={() => {
                          setSearchParams({
                            country: geo.properties.name,
                          });
                        }}
                      >
                        {/* @ts-expect-error: text not found in svg */}
                        <text textAnchor="middle" fill="black" strokeWidth={0} fontSize="8px" cursor="pointer">
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
        <Button onClick={handleZoomIn} size="sm" className="p-2">
          <Plus className="h-4 w-4 md:h-6 md:w-6" />
        </Button>
        <Button onClick={handleZoomOut} size="sm" className="p-2">
          <Minus className="h-4 w-4 md:h-6 md:w-6" />
        </Button>
      </div>
    </div>
  );
};
