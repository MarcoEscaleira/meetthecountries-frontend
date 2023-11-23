"use client";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import MapChart from "@/app/game/MapChart";

export default function GamePage() {
  const [content, setContent] = useState("");

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-black mt-3 mb-6 sm:mt-4 sm:mb-8 sm:text-4xl">Let the game begin...</h1>
      <MapChart setTooltipContent={setContent} />
      <Tooltip id="country-tooltip">{content}</Tooltip>
    </div>
  );
}
