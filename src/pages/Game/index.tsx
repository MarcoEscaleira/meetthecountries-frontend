import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { gql } from "@generated/gql.ts";
import { CountryQuizList } from "./CountryQuizList.tsx";
import { MapChart } from "./MapChart.tsx";

const GET_COUNTRY_QUIZZES = gql(/* GraphQL */ `
  query CountryQuizzes($country: String!) {
    quizList(country: $country) {
      id
      title
      description
      difficulty
      timeLimit
      image
      tags
      questions {
        question
        type
      }
      creator {
        lastName
      }
    }
  }
`);

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
    <div className="flex w-full flex-col items-center px-4 pb-4 pt-20 md:px-12 md:pt-24">
      <MapChart />

      <CountryQuizList quizList={data?.quizList || []} isLoadingCountryQuizList={isLoadingCountryQuizList} />
    </div>
  );
}
