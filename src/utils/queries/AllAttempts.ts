import { gql } from "@generated/gql.ts";

export const ALL_QUIZ_ATTEMPTS = gql(/* GraphQL */ `
  query AllUserAttempts($userId: String) {
    attempts(userId: $userId) {
      id
      correctOptions
      percentage
      minutes
      seconds
      startTime
      endTime
      rating
      quiz {
        title
        timeLimit
        questions {
          question
        }
      }
    }
  }
`);
