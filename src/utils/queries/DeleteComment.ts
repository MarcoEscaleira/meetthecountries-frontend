import { gql } from "@generated/gql.ts";

export const DELETE_QUIZ_COMMENT = gql(/* GraphQL */ `
  mutation DeleteQuizComments($commentId: String!) {
    deleteComment(commentId: $commentId)
  }
`);
