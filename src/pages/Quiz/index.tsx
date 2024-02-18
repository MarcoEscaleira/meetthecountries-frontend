import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Breadcrumbs,
  Button,
  Chip,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";
import { QuizAttempt } from "@components/QuizAttempt/QuizAttempt.tsx";
import { TimeLimitChip } from "@components/TimeLimitChip/TimeLimitChip.tsx";
import { gql } from "@generated/gql.ts";
import { QuizData, Roles } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";
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

export function Component() {
  const {
    user: { role },
  } = useUserStore();
  const { quizId } = useParams();
  const [openedAccordion, setOpenedAccordion] = useState(1);

  const handleOpenedAccordion = (value: number) => setOpenedAccordion(openedAccordion === value ? 0 : value);

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
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-16 md:px-12 md:pt-24">
      <Breadcrumbs className="mb-8 flex items-center">
        <Link to={`/game?country=${quiz?.country}`} className="opacity-60">
          Game
        </Link>
        <Link to="">Quiz</Link>
      </Breadcrumbs>

      <Accordion open={openedAccordion === 1}>
        <AccordionHeader className="py-3 outline-none" onClick={() => handleOpenedAccordion(1)}>
          <div className="flex w-full items-center justify-between">
            <Typography className="font-medium">Quiz information</Typography>
            {role === Roles.Admin && (
              <Button
                variant="outlined"
                size='sm'
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                Edit quiz
              </Button>
            )}
          </div>
        </AccordionHeader>
        <AccordionBody>
          <Typography variant="h1" className="mb-3 text-xl font-medium md:text-2xl">
            {quiz?.title}
          </Typography>
          <Typography className="font-normal">{quiz?.description}</Typography>

          <Typography className="mt-8 flex items-center gap-2 text-xl">
            <img
              src={countryDetails?.flags.svg}
              alt={countryDetails?.name}
              className="h-5 w-5 rounded-full object-cover"
            />
            {countryDetails?.name}
          </Typography>

          <div className="mt-6 flex gap-3">
            <DifficultyChip difficulty={quiz?.difficulty} />
            <TimeLimitChip timeLimit={quiz?.timeLimit || 0} />
          </div>

          {(quiz?.tags?.length || 0) > 0 && (
            <div className="mt-4 flex gap-3">
              {quiz?.tags?.map(tag => <Chip key={tag} value={`#${tag}`} color="gray" />)}
            </div>
          )}
        </AccordionBody>
      </Accordion>

      {/* TODO: later fix this to use correct type coming from the query */}
      <QuizAttempt
        quiz={quiz as QuizData}
        handleQuizStart={() => handleOpenedAccordion(0)}
        handleQuizEnd={() => handleOpenedAccordion(1)}
      />
    </div>
  );
}
