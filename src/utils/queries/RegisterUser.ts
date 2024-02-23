import { gql } from "@generated/gql.ts";

export const REGISTER_USER = gql(/* GraphQL */ `
  mutation SignupUser($user: SignUpInput!) {
    signupUser(user: $user) {
      id
    }
  }
`);
