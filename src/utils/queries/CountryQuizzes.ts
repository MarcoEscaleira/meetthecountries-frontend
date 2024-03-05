import { gql } from "@generated/gql.ts";

export const GET_COUNTRY_QUIZZES = gql(/* GraphQL */ `
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
