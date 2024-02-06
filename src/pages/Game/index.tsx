import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { MapChart } from "./MapChart.tsx";

export function Component() {
  const [content, setContent] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1 className="mb-6 mt-3 text-2xl font-semibold text-black sm:mb-8 sm:mt-4 sm:text-4xl">Let the game begin...</h1>
      <MapChart setTooltipContent={setContent} />
      <Tooltip id="country-tooltip">{content}</Tooltip>
    </div>
  );
}
