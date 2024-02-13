/// <reference types="vite/client" />
declare const __API_SERVICE__: string;
declare const __MAPBOX_TOKEN__: string;

type Country = {
  name: string;
  capital: string;
  area: number;
  coordinates: number[];
  currencies: {
    name: string;
    symbol: string;
  }[];
  languages: string[];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  postalCode: {
    format: string;
    regex: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  population: number;
  emoji: string;
  countryCallingCode: string;
};

declare module "use-react-countries" {
  export function useCountries(): {
    countries: Array<Country>;
  };
}
