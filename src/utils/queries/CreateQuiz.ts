import { gql } from "@generated/gql.ts";

export const CREATE_QUIZ = gql(/* GraphQL */ `
  mutation CreateQuiz($quiz: QuizAddInput!) {
    createQuiz(quiz: $quiz) {
      id
    }
  }
`);
