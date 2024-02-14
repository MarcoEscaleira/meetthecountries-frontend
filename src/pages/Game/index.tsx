import { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useCountries } from "use-react-countries";
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
  const [selectedTooltipContent, setSelectedTooltipContent] = useState("");

  const selectedCountry = searchParams.get("country") || "";
  useEffect(() => {
    if (selectedCountry) {
      fetchCountryDetails({ variables: { country: selectedCountry } });
    }
  }, [searchParams]);

  const { countries } = useCountries();
  const countryDetails = useCallback(
    () => countries.find(({ name }) => name.toLowerCase() === selectedCountry.toLowerCase()),
    [selectedCountry]
  );

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-20 md:pt-24 md:px-12">
      <Tooltip id="country-tooltip">{selectedTooltipContent}</Tooltip>
      <MapChart setTooltipContent={setSelectedTooltipContent} />

      <CountryQuizList
        countryDetails={countryDetails()}
        quizList={data?.quizList || []}
        isLoadingCountryQuizList={isLoadingCountryQuizList}
      />
    </div>
  );
}
