import { gql } from "@generated/gql.ts";

export const UPDATE_USER = gql(/* GraphQL */ `
  mutation UpdateUser($userId: String!, $user: UserUpdateInput!) {
    updateUser(userId: $userId, user: $user) {
      id
    }
  }
`);
