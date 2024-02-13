import { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Typography } from "@material-tailwind/react";
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
        options {
          correct
          text
        }
      }
      createdAt
      updatedAt
      creator {
        lastName
      }
    }
  }
`);

export function Component() {
  const [fetchCountryDetails, { data, loading: isLoadingCountryQuizList }] = useLazyQuery(GET_COUNTRY_QUIZZES);
  const [selectedTooltipContent, setSelectedTooltipContent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    if (selectedCountry) {
      fetchCountryDetails({ variables: { country: selectedCountry } });
    }
  }, [selectedCountry]);

  const { countries } = useCountries();
  const countryDetails = useCallback(
    () => countries.find(({ name }) => name.toLowerCase() === selectedCountry.toLowerCase()),
    [selectedCountry]
  );

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Typography variant="h1" className="mb-6 mt-10 text-3xl md:mt-10 md:text-5xl">
        Map
      </Typography>

      <Tooltip id="country-tooltip">{selectedTooltipContent}</Tooltip>
      <MapChart setSelectedCountry={setSelectedCountry} setTooltipContent={setSelectedTooltipContent} />

      <CountryQuizList
        countryDetails={countryDetails()}
        quizList={data?.quizList || []}
        isLoadingCountryQuizList={isLoadingCountryQuizList}
      />
    </div>
  );
}
