import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Tooltip } from "react-tooltip";
import { MapChart } from "./MapChart.tsx";

export function Component() {
  const [content, setContent] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Typography variant="h1" className="mt-10 md:mt-10 mb-6 text-3xl md:text-5xl">Map</Typography>
      
      <MapChart setTooltipContent={setContent} />
      
      <Tooltip id="country-tooltip">{content}</Tooltip>
    </div>
  );
}
