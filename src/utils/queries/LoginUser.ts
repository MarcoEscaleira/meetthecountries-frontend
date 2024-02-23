import {gql} from "@generated/gql.ts";

export const LOGIN_USER = gql(/* GraphQL */ `
    mutation LoginUser($input: LoginInput!) {
        loginUser(input: $input) {
            access_token
        }
    }
`);
