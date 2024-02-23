import { gql } from "@generated/gql.ts";

export const GET_QUIZ_ATTEMPTS = gql(/* GraphQL */ `
  query QuizAttempts($quizId: String!, $userId: String) {
    attempts(quizId: $quizId, userId: $userId) {
      id
      correctOptions
      percentage
      minutes
      seconds
      startTime
      endTime
      quiz {
        questions {
          question
        }
      }
      user {
        id
        firstName
      }
    }
  }
`);
