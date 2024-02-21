import { gql } from "@generated/gql.ts";

export const SUBMIT_ATTEMPT = gql(/* GraphQL */ `
  mutation SubmitAttempt($attempt: AttemptAddInput!) {
    addAttempt(attempt: $attempt) {
      id
    }
  }
`);
