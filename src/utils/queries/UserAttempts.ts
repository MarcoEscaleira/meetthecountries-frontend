import { gql } from "@generated/gql.ts";

export const GET_USER_ATTEMPTS = gql(/* GraphQL */ `
  query UserAttempts($userId: String) {
    attempts(userId: $userId) {
      id
      quiz {
        id
        country
      }
    }
  }
`);
