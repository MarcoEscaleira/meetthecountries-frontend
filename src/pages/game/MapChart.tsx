import { Dispatch, FC, SetStateAction } from "react";
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";

export const MapChart: FC<{
  setTooltipContent: Dispatch<SetStateAction<string>>;
}> = ({ setTooltipContent }) => {
  return (
    <div className="w-full">
      <ComposableMap>
        <ZoomableGroup center={[5, 46]} zoom={4}>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map(geo => (
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
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
