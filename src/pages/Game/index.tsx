import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Tooltip } from "react-tooltip";
import { useCountries } from "use-react-countries";
import { MapChart } from "./MapChart.tsx";

export function Component() {
  const [selectedTooltipContent, setSelectedTooltipContent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const { countries } = useCountries();
  const countyDetails = countries.find(({ name }: { name: string }) => name.toLowerCase() === selectedCountry.toLowerCase());

  console.log(countries);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Typography variant="h1" className="mb-6 mt-10 text-3xl md:mt-10 md:text-5xl">
        Map
      </Typography>

      <Tooltip id="country-tooltip">{selectedTooltipContent}</Tooltip>
      <MapChart setSelectedCountry={setSelectedCountry} setTooltipContent={setSelectedTooltipContent} />

      {selectedCountry && (
        <>
          <div className="mb-4 mt-8 flex items-center gap-8">
            <Typography variant="h2" className="text-2xl flex items-center gap-2">
              <img src={countyDetails.flags.svg} alt={selectedCountry} className="h-5 w-5 rounded-full object-cover" />

              {selectedCountry}
            </Typography>
            <Button className="h-10">View country information</Button>
          </div>
        </>
      )}
    </div>
  );
}
