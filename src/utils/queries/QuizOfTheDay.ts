import { gql } from "@generated/gql.ts";

export const QUIZ_OF_THE_DAY = gql(/* GraphQL */ `
  query QuizOfTheDay {
    quizOfTheDay {
      id
    }
  }
`);
