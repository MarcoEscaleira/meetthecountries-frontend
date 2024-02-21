import {gql} from "@generated/gql.ts";

export const GET_ATTEMPT_RESULT = gql(/* GraphQL */ `
    query AttemptResult($attemptId: String!) {
        attempts(attemptId: $attemptId) {
            id
            correctOptions
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
            }
        }
    }
`);
