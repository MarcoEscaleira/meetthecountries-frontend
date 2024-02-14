import { useQuery } from "@apollo/client";
import { Breadcrumbs, Chip, Spinner, Typography } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import { Link, useParams } from "react-router-dom";
import { gql } from "@generated/gql.ts";
import { Difficulty } from "@generated/graphql.ts";
import { useCountryDetails } from "@utils/hooks/useCountryDetails.ts";

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

const DifficultyChip = ({ difficulty }: { difficulty: Difficulty }) => {
  const color = {
    [Difficulty.Easy]: "green",
    [Difficulty.Medium]: "yellow",
    [Difficulty.Hard]: "red",
    [Difficulty.Unknown]: "gray",
  }[difficulty];

  return <Chip color={color as colors} value={difficulty} />;
};

export function Component() {
  const { quizId } = useParams();

  const { data, loading } = useQuery(GET_QUIZ, { variables: { quizId: quizId || "" } });
  const quiz = data?.quizList[0];

  const countryDetails = useCountryDetails(quiz?.country || "");

  if (loading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-16 w-16" />
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-20 md:px-12 md:pt-24">
      <Breadcrumbs className="mb-8 flex items-center">
        <Link to={`/game?country=${quiz?.country}`} className="opacity-60">
          Game
        </Link>
        <Link to="">Quiz</Link>
      </Breadcrumbs>

      <Typography variant="h1" className="mb-3 text-xl font-medium md:text-2xl">
        {quiz?.title}
      </Typography>
      <Typography className="font-normal">{quiz?.description}</Typography>

      <Typography className="mt-8 flex items-center gap-2 text-xl">
        <img src={countryDetails?.flags.svg} alt={countryDetails?.name} className="h-5 w-5 rounded-full object-cover" />
        {countryDetails?.name}
      </Typography>

      <div className="mt-6 flex gap-3">
        <DifficultyChip difficulty={quiz?.difficulty || Difficulty.Unknown} />
        <Chip value={quiz?.timeLimit ? `${quiz?.timeLimit} minutes` : "Unlimited time"} color="blue-gray" />
      </div>

      {(quiz?.tags?.length || 0) > 0 && (
        <div className="mt-4 flex gap-3">
          {quiz?.tags?.map(tag => <Chip key={tag} value={`#${tag}`} color="gray" />)}
        </div>
      )}
    </div>
  );
}
