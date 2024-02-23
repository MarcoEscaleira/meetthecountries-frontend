import { gql } from "@generated/gql.ts";

export const GET_ATTEMPT_RESULT = gql(/* GraphQL */ `
  query AttemptResult($attemptId: String!) {
    attempts(attemptId: $attemptId) {
      id
      correctOptions
      percentage
      minutes
      seconds
      startTime
      endTime
      questions {
        question
      }
      user {
        firstName
        lastName
      }
      quiz {
        title
        country
        questions {
          question
          type
          options {
            text
            correct
            chosen
          }
        }
        creator {
          firstName
          lastName
          country
        }
      }
    }
  }
`);
