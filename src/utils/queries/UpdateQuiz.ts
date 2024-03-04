import { gql } from "@generated/gql.ts";

export const UPDATE_QUIZ = gql(/* GraphQL */ `
  mutation UpdateQuiz($quizId: String!, $quiz: QuizAddInput!) {
    updateQuiz(quizId: $quizId, quiz: $quiz) {
      id
    }
  }
`);
