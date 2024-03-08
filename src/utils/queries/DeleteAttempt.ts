import { gql } from "@generated/gql.ts";

export const DELETE_ATTEMPT = gql(/* GraphQL */ `
  mutation DeleteAttempt($attemptId: String!) {
    deleteAttempt(attemptId: $attemptId)
  }
`);
