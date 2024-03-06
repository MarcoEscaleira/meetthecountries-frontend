import { gql } from "@generated/gql.ts";

export const CANCEL_QUIZ = gql(/* GraphQL */ `
  mutation CancelQuiz($quizId: String!) {
    cancelQuiz(quizId: $quizId)
  }
`);
