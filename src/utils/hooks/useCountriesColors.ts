import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useUserStore } from "@state/userStore.ts";
import { GET_QUIZZES } from "@utils/queries/Quizzes.ts";
import { GET_USER_ATTEMPTS } from "@utils/queries/UserAttempts.ts";

interface CountryColors {
  [country: string]: string;
}

export const useCountriesColors = (): CountryColors => {
  const {
    user: { userId },
  } = useUserStore();
  const { data: quizzesData } = useQuery(GET_QUIZZES);
  const { data: attemptsData } = useQuery(GET_USER_ATTEMPTS, { variables: { userId }, fetchPolicy: "network-only" });

  const countryColours = useMemo(() => {
    const quizzes = quizzesData?.quizList;
    const attempts = attemptsData?.attempts;

    if (quizzes?.length && attempts?.length && userId) {
      const totalQuizzesPerCountry = quizzes?.reduce<{ [country: string]: string[] }>((acc, { id, country }) => {
        return {
          ...acc,
          [country]: acc[country]?.length > 0 ? [...acc[country], id] : [id],
        };
      }, {});

      // Get the sum of attempts for a quiz within the given country
      const attemptsList = attempts?.reduce((acc, { quiz: { id: quizId, country } }) => {
        const currentAttemptCount = acc?.[country]?.[quizId] ? acc[country][quizId] : 0;
        return {
          ...acc,
          [country]: {
            ...acc[country],
            [quizId]: currentAttemptCount + 1,
          },
        };
      }, {});

      // Map the country colour based on the total quizzes and attempts
      // Return an object that keys are the country and value is the color
      return Object.keys(totalQuizzesPerCountry)?.reduce((acc, country) => {
        const totalCountryQuizzes = totalQuizzesPerCountry?.[country]?.length || 0;
        const quizzesAttempted = Object.keys(attemptsList?.[country] || {})?.length || 0;

        let color = "fill-blue-gray-200";

        if (totalCountryQuizzes === quizzesAttempted && quizzesAttempted !== 0) {
          color = "fill-green-200";
        }

        // User only did some of the country quizzes
        if (quizzesAttempted > 0 && quizzesAttempted < totalCountryQuizzes) {
          color = "fill-blue-200";
        }

        return {
          ...acc,
          [country]: color,
        };
      }, {});
    }

    return {};
  }, [quizzesData?.quizList, attemptsData?.attempts]);

  return countryColours;
};
