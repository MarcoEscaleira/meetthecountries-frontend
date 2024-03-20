import { gql } from "@generated/gql.ts";

export const UPDATE_QUIZ_COMMENT = gql(/* GraphQL */ `
  mutation UpdateQuizComments($commentId: String!, $text: String!) {
    editComment(commentId: $commentId, text: $text)
  }
`);
