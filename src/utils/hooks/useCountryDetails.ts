import { useCallback } from "react";
import { useCountries } from "use-react-countries";

export const useCountryDetails = (country: string) => {
  const { countries } = useCountries();

  const countryDetails = useCallback(
    () => countries.find(({ name }) => name.toLowerCase() === country.toLowerCase()),
    [country]
  );

  return countryDetails();
};
