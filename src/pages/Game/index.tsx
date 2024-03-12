import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { GET_COUNTRY_QUIZZES } from "@utils/queries";
import { CountryQuizList } from "./CountryQuizList.tsx";
import { MapChart } from "./MapChart.tsx";

export function Component() {
  const [searchParams] = useSearchParams();
  const { data, loading: isLoadingCountryQuizList } = useQuery(GET_COUNTRY_QUIZZES, {
    variables: { country: searchParams.get("country") || "" },
  });

  return (
    <div className="flex w-full flex-col items-center overflow-y-auto px-4 pb-4 pt-20 md:px-12 md:pt-24">
      <MapChart />

      <CountryQuizList quizList={data?.quizzesByCountry || []} isLoadingCountryQuizList={isLoadingCountryQuizList} />
    </div>
  );
}
