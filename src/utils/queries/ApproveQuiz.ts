import { gql } from "@generated/gql.ts";

export const APPROVE_QUIZ = gql(/* GraphQL */ `
  mutation ApproveQuiz($quizId: String!) {
    approveQuiz(quizId: $quizId)
  }
`);
