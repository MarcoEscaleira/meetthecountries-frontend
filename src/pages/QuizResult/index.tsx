import { useQuery } from "@apollo/client";
import { Breadcrumbs, Spinner, Typography } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { gql } from "@generated/gql.ts";

const GET_ATTEMPT_RESULT = gql(/* GraphQL */ `
  query AttemptResult($attemptId: String!) {
    attempts(attemptId: $attemptId) {
      id
      score
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

export function Component() {
  const { quizId, attemptId } = useParams();

  const { data, loading } = useQuery(GET_ATTEMPT_RESULT, { variables: { attemptId: attemptId || "" } });
  const attempt = data?.attempts[0];
  const quiz = data?.attempts[0]?.quiz;

  if (loading && !data)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-16 w-16" />
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-16 md:px-12 md:pt-24">
      <Breadcrumbs className="mb-8 flex items-center">
        <Link to={`/game?country=${quiz?.country}`} className="opacity-60">
          Game
        </Link>
        <Link to={`/game/quiz/${quizId}`}>Quiz</Link>
        <Link to="">Attempt</Link>
      </Breadcrumbs>

      <Typography>Attempt - {attempt?.id}</Typography>

      <Typography>{attempt?.score}</Typography>
      <Typography>{attempt?.startTime}</Typography>
      <Typography>{attempt?.endTime}</Typography>
      <Typography>
        Made by: {attempt?.user?.firstName} {attempt?.user?.lastName}
      </Typography>
    </div>
  );
}
