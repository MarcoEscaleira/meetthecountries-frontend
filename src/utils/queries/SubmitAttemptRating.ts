import { gql } from "@generated/gql.ts";

export const SUBMIT_ATTEMPT_RATING = gql(/* GraphQL */ `
    mutation SubmitAttemptRating($attemptId: String!, $rating: Int!) {
        addAttemptRating(attemptId: $attemptId, rating: $rating)
    }
`);
