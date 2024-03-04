import { gql } from "@generated/gql.ts";

export const LOGOUT_USER = gql(/* GraphQL */ `
    query LogoutQuery {
        logoutUser
    }
`);
