import { gql } from "@generated/gql.ts";

export const GET_ATTEMPT_BY_ID = gql(/* GraphQL */ `
  query QuizAttempt($attemptId: String!) {
    attemptById(attemptId: $attemptId) {
      id
      correctOptions
      percentage
      minutes
      seconds
      startTime
      endTime
      rating
      questions {
        question
        type
        options {
          text
          correct
          chosen
        }
      }
      user {
        firstName
        lastName
        country
      }
      quiz {
        title
        country
        creator {
          firstName
          lastName
          country
        }
      }
    }
  }
`);
