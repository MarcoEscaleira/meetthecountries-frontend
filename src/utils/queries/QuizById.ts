import { gql } from "@generated/gql.ts";

export const GET_QUIZ_BY_ID = gql(/* GraphQL */ `
  query QuizById($quizId: String!) {
    quizById(quizId: $quizId) {
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
        image
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
