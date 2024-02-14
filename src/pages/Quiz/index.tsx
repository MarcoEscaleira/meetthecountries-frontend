import { useQuery } from "@apollo/client";
import { Breadcrumbs, Spinner, Typography } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { gql } from "@generated/gql.ts";

const GET_QUIZ = gql(/* GraphQL */ `
  query QuizById($quizId: String!) {
    quizList(quizId: $quizId) {
      id
      title
      description
      difficulty
      timeLimit
      image
      tags
      questions {
        question
        type
        options {
          correct
          text
        }
      }
      country
      creator {
        lastName
      }
      lastEditor {
        lastName
      }
      createdAt
      updatedAt
    }
  }
`);

export function Component() {
  const { quizId } = useParams();

  const { data, loading } = useQuery(GET_QUIZ, { variables: { quizId: quizId || "" } });
  const quiz = data?.quizList[0];

  if (loading)
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner className="h-16 w-16" />
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-20 md:px-12 md:pt-24">
      <Breadcrumbs className="mb-4 flex items-center">
        <Link to={`/game?country=${quiz?.country}`} className="opacity-60">
          Game
        </Link>
        <Link to="">Quiz</Link>
      </Breadcrumbs>
      <Typography variant="h1" className="text-xl font-medium md:text-2xl">
        {quiz?.title}
      </Typography>
    </div>
  );
}
