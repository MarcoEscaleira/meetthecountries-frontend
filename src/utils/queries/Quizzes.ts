import { gql } from "@generated/gql.ts";

export const GET_QUIZZES = gql(/* GraphQL */ `
  query Quizzes($country: String, $status: QuizStatus) {
    quizList(country: $country, status: $status) {
      id
      title
      difficulty
      timeLimit
      tags
      status
      country
      creator {
        firstName
        lastName
      }
      lastEditor {
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`);
