import { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Breadcrumbs, Button, List, ListItem, Spinner, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ScoreChip } from "@components/ScoreChip/ScoreChip.tsx";
import { QuestionType } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";
import { COLOURS } from "@utils/constants.ts";
import { useCountryDetails } from "@utils/hooks/useCountryDetails.ts";
import { GET_ATTEMPT_RESULT } from "@utils/queries/AttemptResult.ts";
import { GET_QUIZ_ATTEMPTS } from "@utils/queries/QuizAttempts.ts";

const handleOptionColor = (correct: boolean, chosen: boolean, index: number) => {
  if (chosen && !correct) return "red";
  if (correct) return "green";
  return COLOURS[index];
};

const handleOptionVariant = (correct: boolean, chosen: boolean) => {
  if (correct || chosen) return "filled";
  return "outlined";
};

export function Component() {
  const navigate = useNavigate();
  const { quizId, attemptId } = useParams();
  const {
    user: { userId },
  } = useUserStore();

  const [fetchQuizAttempts, { data: quizAttempts, loading: loadingAllAttempts }] = useLazyQuery(GET_QUIZ_ATTEMPTS);

  useEffect(() => {
    if (quizId && userId) fetchQuizAttempts({ variables: { quizId } });
  }, [quizId, userId]);

  const { data: currentAttempt, loading: loadingCurrentAttempt } = useQuery(GET_ATTEMPT_RESULT, {
    variables: { attemptId: attemptId || "" },
  });
  const attempt = currentAttempt?.attempts[0];
  const quiz = currentAttempt?.attempts[0]?.quiz;
  const countryDetails = useCountryDetails(quiz?.country || "");

  if (loadingCurrentAttempt && !currentAttempt)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-16 w-16" />
      </div>
    );

  const totalQuestions = attempt?.questions.length || 0;

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-16 md:px-12 md:pt-24">
      <Breadcrumbs className="mb-8 flex items-center">
        <Link to={`/game?country=${quiz?.country}`} className="opacity-60">
          Game
        </Link>
        <Link className="opacity-60" to={`/game/quiz/${quizId}`}>
          Quiz
        </Link>
        <Link to="">Attempt</Link>
      </Breadcrumbs>

      <Typography variant="h1" className="mb-4 text-4xl md:text-6xl">
        Well done {attempt?.user?.firstName}!
      </Typography>

      <Typography variant="lead" className="mb-2 text-lg md:mb-5 md:text-2xl">
        In your last attempt you have guessed {attempt?.correctOptions} out of {totalQuestions} questions.
      </Typography>

      <ScoreChip percentage={attempt?.percentage || 0} />

      <div className="mb-4 mt-2 flex flex-col gap-2 md:mt-5">
        <Typography variant="small" className="flex items-center">
          <ChevronRight className="size-4" /> {format(new Date(attempt?.startTime), "dd MMM yyyy hh:mm:ss")}
        </Typography>
        <Typography variant="small" className="flex items-center">
          <ChevronRight className="size-4" /> {format(new Date(attempt?.endTime), "dd MMM yyyy hh:mm:ss")}
        </Typography>
      </div>
      <Typography className="flex items-center font-medium">
        Quiz made by {attempt?.quiz?.creator.firstName} {attempt?.quiz?.creator.lastName}
        <img
          src={countryDetails?.flags.svg}
          alt={countryDetails?.name}
          className="ml-1 size-5 rounded-full object-cover"
        />
      </Typography>
      <div className="mt-4 flex items-center gap-4 md:mt-6">
        <Button color="light-blue" onClick={() => navigate(`/game?country=${attempt?.quiz.country}`)}>
          Go to country
        </Button>
        <Button color="blue-gray" onClick={() => navigate(`/game/quiz/${quizId}`)}>
          Go back
        </Button>
      </div>
      <div className="flex w-full flex-col items-center md:flex-row md:items-start md:gap-5">
        <section className="flex w-full flex-grow flex-col gap-4 md:w-3/5">
          <Typography variant="h2" className="mt-8 text-xl md:text-3xl">
            Review your answers
          </Typography>

          <div className="flex flex-col">
            {attempt?.questions?.map(({ question, options, type }) => (
              <>
                <Typography className="mb-2 text-lg font-medium md:text-xl">{question}</Typography>

                <div className="mb-5 flex flex-wrap gap-3">
                  {type === QuestionType.Single &&
                    options.map(({ text, correct, chosen }, index) => (
                      <Button
                        key={text}
                        fullWidth
                        variant={handleOptionVariant(correct, !!chosen)}
                        color={handleOptionColor(correct, !!chosen, index)}
                        disabled
                      >
                        {text}
                      </Button>
                    ))}
                </div>
              </>
            ))}
          </div>
        </section>

        <section className="flex w-full flex-col gap-3 md:w-auto">
          <Typography variant="h2" className="mt-8 text-xl md:text-3xl">
            How are other users doing?
          </Typography>

          <div className="flex w-72 flex-col">
            {loadingAllAttempts && <Loader2 size={20} className="mt-4 animate-spin" />}

            {quizAttempts?.attempts.length === 0 && !loadingAllAttempts && (
              <Typography>No user has attempted this quiz.</Typography>
            )}

            {(quizAttempts?.attempts?.length || 0) > 0 && !loadingAllAttempts && (
              <List className="flex flex-col p-0">
                {quizAttempts?.attempts.map(({ id, percentage, minutes, seconds, user }, index) => {
                  if (user.id === userId) return null;

                  return (
                    <ListItem key={id} className="flex items-center">
                      <Typography className="mr-2 text-lg font-medium">{index + 1}.</Typography>
                      <ScoreChip percentage={percentage} /> <ChevronRight className="mx-2 size-6" />
                      <Typography className="">
                        {minutes}m : {seconds}s
                      </Typography>
                      <Typography className="ml-2 font-medium">by {user.firstName}</Typography>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
