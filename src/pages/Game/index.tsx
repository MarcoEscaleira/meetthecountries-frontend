import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { GET_COUNTRY_QUIZZES } from "@utils/queries/CountryQuizzes.ts";
import { CountryQuizList } from "./CountryQuizList.tsx";
import { MapChart } from "./MapChart.tsx";

export function Component() {
  const [searchParams] = useSearchParams();
  const [fetchCountryDetails, { data, loading: isLoadingCountryQuizList }] = useLazyQuery(GET_COUNTRY_QUIZZES);

  const selectedCountry = searchParams.get("country") || "";
  useEffect(() => {
    if (selectedCountry) {
      fetchCountryDetails({ variables: { country: selectedCountry } });
    }
  }, [searchParams]);

  return (
    <div className="flex w-full flex-col items-center overflow-y-auto px-4 pb-4 pt-20 md:px-12 md:pt-24">
      <MapChart />

      <CountryQuizList quizList={data?.quizzesByCountry || []} isLoadingCountryQuizList={isLoadingCountryQuizList} />
    </div>
  );
}
