import { Typography } from "@material-tailwind/react";
import { useCountryDetails } from "@utils/hooks/useCountryDetails.ts";

export function Country({ country }: { country: string }) {
  const countryDetails = useCountryDetails(country || "");

  return (
    <div className="flex items-center gap-2">
      <img src={countryDetails?.flags?.svg} alt={country} className="size-5 rounded-full object-cover" />
      <Typography variant="small">{country}</Typography>
    </div>
  );
}
