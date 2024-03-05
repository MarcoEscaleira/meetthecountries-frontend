import { gql } from "@generated/gql.ts";

export const GET_QUIZZES = gql(/* GraphQL */ `
  query Quizzes($country: String, $status: QuizStatus) {
    quizList(country: $country, status: $status) {
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
          chosen
        }
      }
      country
      creator {
        lastName
      }
      lastEditor {
        lastName
      }
      createdAt
      updatedAt
    }
  }
`);
