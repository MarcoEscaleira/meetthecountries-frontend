import { useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Breadcrumbs,
  Button,
  Chip,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Calendar } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AttemptHistoryTable } from "@components/AttemptHistoryTable/AttemptHistoryTable.tsx";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";
import { QuizAttempt } from "@components/QuizAttempt/QuizAttempt.tsx";
import { QuizComments } from "@components/QuizComments/QuizComments";
import { QuizRating } from "@components/QuizRating/QuizRating.tsx";
import { TimeLimitChip } from "@components/TimeLimitChip/TimeLimitChip.tsx";
import { Roles } from "@generated/graphql.ts";
import { useAttemptStore } from "@state/attemptStore.ts";
import { useUserStore } from "@state/userStore.ts";
import { useCountryDetails } from "@utils/hooks/useCountryDetails.ts";
import { GET_QUIZ_BY_ID } from "@utils/queries/QuizById.ts";
import { QUIZ_OF_THE_DAY } from "@utils/queries/QuizOfTheDay.ts";

export function Component() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const {
    user: { role },
  } = useUserStore();
  const { isAttemptRunning, quizAccordion, handleQuizAccordion } = useAttemptStore();

  const { data: quizOfDay } = useQuery(QUIZ_OF_THE_DAY);
  const quizOfTheDayId = quizOfDay?.quizOfTheDay?.id;

  const { data, loading, error } = useQuery(GET_QUIZ_BY_ID, { variables: { quizId: quizId || "" } });
  const quiz = data?.quizById;

  const countryDetails = useCountryDetails(quiz?.country || "");

  if (loading || error)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-16 w-16" />
      </div>
    );

  const renderQuizOfDay =
    quiz?.id === quizOfTheDayId ? (
      <Tooltip content="This is the quiz of the day">
        <Calendar className="mr-2 size-7 stroke-blue-500" />
      </Tooltip>
    ) : null;

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-16 md:px-12 md:pt-24">
      <Breadcrumbs className="mb-2 flex items-center md:mb-6">
        <Link to={`/game?country=${quiz?.country}`} className="opacity-60">
          Game
        </Link>
        <Link to="">Quiz</Link>
      </Breadcrumbs>

      <section className="container">
        <Accordion open={quizAccordion === 1}>
          <AccordionHeader className="py-3 outline-none" onClick={() => handleQuizAccordion(1)}>
            <div className="flex w-full items-center justify-between">
              <Typography className="font-medium">Quiz information</Typography>
              {role === Roles.Admin && (
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={event => {
                    event.stopPropagation();
                    navigate(`/game/quiz/${quiz?.id}/edit/`);
                  }}
                >
                  Edit quiz
                </Button>
              )}
            </div>
          </AccordionHeader>
          <AccordionBody className="flex gap-3">
            <section className="flex-grow">
              <Typography variant="h1" className="mb-3 flex items-center text-xl font-medium md:text-2xl">
                {renderQuizOfDay} {quiz?.title}
              </Typography>
              <Typography className="font-normal">{quiz?.description}</Typography>

              <Typography className="mt-4 flex items-center gap-2 text-xl md:mt-8">
                <img
                  src={countryDetails?.flags.svg}
                  alt={countryDetails?.name}
                  className="size-5 rounded-full object-cover"
                />
                {countryDetails?.name}
              </Typography>

              <div className="mt-4 flex gap-3 md:mt-6">
                <DifficultyChip difficulty={quiz?.difficulty} />
                <TimeLimitChip timeLimit={quiz?.timeLimit || 0} />
                <QuizRating quizId={quizId || ""} />
              </div>

              {(quiz?.tags?.length || 0) > 0 && (
                <div className="mt-4 flex gap-3">
                  {quiz?.tags?.map(tag => <Chip key={tag} value={`#${tag}`} color="gray" />)}
                </div>
              )}
            </section>
            {!isAttemptRunning && (
              <div className="hidden w-80 md:flex">
                <AttemptHistoryTable quizId={quiz?.id || ""} />
              </div>
            )}
          </AccordionBody>
        </Accordion>

        <div className="flex w-full justify-center">
          <QuizAttempt quiz={quiz!} />
        </div>
      </section>

      {!isAttemptRunning && (
        <div className="container mt-6 flex flex-col md:hidden">
          <hr className="border-secondaryShades.5 mb-4 flex w-full" />
          <AttemptHistoryTable quizId={quiz?.id || ""} />
        </div>
      )}

      {!isAttemptRunning && (
        <div className="container mt-6 flex w-full justify-center">
          <QuizComments />
        </div>
      )}
    </div>
  );
}
