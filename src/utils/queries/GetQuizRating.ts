import { gql } from "@generated/gql.ts";

export const GET_QUIZ_RATING = gql(/* GraphQL */ `
  query QuizRating($quizId: String!) {
    quizRating(quizId: $quizId)
  }
`);
