import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { geoCentroid } from "d3-geo";
import { Minus, Plus } from "lucide-react";
import { ZoomableGroup, ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

interface Position {
  coordinates: Array<number>;
  zoom: number;
}

export const MapChart: FC<{
  setTooltipContent: Dispatch<SetStateAction<string>>;
}> = ({ setTooltipContent }) => {
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
          }}
        >
          {/* @ts-expect-error: due to a temporary update on the @types/react */}
          <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
            {/* @ts-expect-error: due to a temporary update on the @types/react */}
            <Geographies geography="/features.json">
              {({ geographies }) =>
                geographies.map(geo => {
                  const provinceCenter = geoCentroid(geo);

                  return (
                    <Fragment key={geo.rsmKey}>
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        data-tooltip-id="country-tooltip"
                        onMouseEnter={() => {
                          setTooltipContent(`${geo.properties.name}`);
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                        style={{
                          default: {
                            fill: "#D6D6DA",
                            outline: "none",
                          },
                          hover: {
                            fill: "#004f79",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#00a6ff",
                            outline: "none",
                          },
                        }}
                      />
                      <Marker key={`name-${geo.rsmKey}`} coordinates={provinceCenter}>
                        {/* @ts-expect-error: text not found in svg */}
                        <text textAnchor="middle" fill="black" strokeWidth={0} fontSize="8px">
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
      <div className="mt-3 flex w-full items-center justify-center gap-3">
        <Typography>Controls</Typography>
        <Button onClick={handleZoomIn} size="sm">
          <Plus />
        </Button>
        <Button onClick={handleZoomOut} size="sm">
          <Minus />
        </Button>
      </div>
    </div>
  );
};
