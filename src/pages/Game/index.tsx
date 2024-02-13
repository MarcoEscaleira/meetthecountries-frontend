import { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Typography, Button, Card } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useCountries } from "use-react-countries";
import { gql } from "@generated/gql.ts";
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
  const [fetchCountryDetails, { data, loading }] = useLazyQuery(GET_COUNTRY_QUIZZES);
  const [selectedTooltipContent, setSelectedTooltipContent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const { countries } = useCountries();
  const countyDetails = useCallback(
    () => countries.find(({ name }: { name: string }) => name.toLowerCase() === selectedCountry.toLowerCase()),
    [selectedCountry]
  );

  useEffect(() => {
    if (selectedCountry) {
      fetchCountryDetails({ variables: { country: selectedCountry } });
    }
  }, [selectedCountry]);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Typography variant="h1" className="mb-6 mt-10 text-3xl md:mt-10 md:text-5xl">
        Map
      </Typography>

      <Tooltip id="country-tooltip">{selectedTooltipContent}</Tooltip>
      <MapChart setSelectedCountry={setSelectedCountry} setTooltipContent={setSelectedTooltipContent} />

      {selectedCountry && (
        <>
          <div className="mb-4 mt-8 flex items-center gap-8 border-b-2 pb-4">
            <Typography variant="h2" className="flex items-center gap-2 text-2xl">
              <img
                src={countyDetails().flags.svg}
                alt={selectedCountry}
                className="h-5 w-5 rounded-full object-cover"
              />

              {selectedCountry}
            </Typography>
            <Button className="h-10">View country information</Button>
          </div>
          {loading && <Loader2 size={60} className="mt-10 animate-spin" />}

          {!loading && data?.quizList && data?.quizList.length === 0 && (
            <Typography>No quizzes found for this country :(</Typography>
          )}

          {!loading &&
            data?.quizList &&
            data?.quizList.length > 0 &&
            data?.quizList.map(({ title }) => <Card key={title}>{title}</Card>)}
        </>
      )}
    </div>
  );
}
