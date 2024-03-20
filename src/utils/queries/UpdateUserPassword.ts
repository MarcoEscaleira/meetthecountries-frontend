import { gql } from "@generated/gql.ts";

export const UPDATE_USER_PASSWORD = gql(/* GraphQL */ `
  mutation UpdateUserPassword($userPasswordInput: PasswordUpdateInput!) {
    updatePassword(userPasswordInput: $userPasswordInput)
  }
`);
