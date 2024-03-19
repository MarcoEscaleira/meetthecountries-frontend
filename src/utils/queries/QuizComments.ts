import { gql } from "@generated/gql.ts";

export const GET_QUIZ_COMMENTS = gql(/* GraphQL */ `
  query QuizComments($quizId: String!) {
    quizComments(quizId: $quizId) {
      id
      text
      createdAt
      user {
        id
        firstName
        lastName
      }
    }
  }
`);
