import { gql } from "@generated/gql.ts";

export const CREATE_QUIZ_COMMENT = gql(/* GraphQL */ `
  mutation CreateQuizComments($comment: CommentAddInput!) {
    addComment(comment: $comment)
  }
`);
