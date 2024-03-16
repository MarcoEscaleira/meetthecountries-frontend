import { useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Breadcrumbs, Button, List, Spinner, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AttemptRating } from "@components/AttemptRating/AttemptRating.tsx";
import { AttemptRow } from "@components/AttemptRow/AttemptRow";
import { ScoreChip } from "@components/ScoreChip/ScoreChip.tsx";
import { QuestionType } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";
import { useCountryDetails } from "@utils/hooks/useCountryDetails.ts";
import { GET_ATTEMPT_BY_ID } from "@utils/queries/AttemptById.ts";
import { DELETE_ATTEMPT } from "@utils/queries/DeleteAttempt.ts";
import { GET_QUIZ_ATTEMPTS } from "@utils/queries/QuizAttempts.ts";
import { DATE_FORMAT, generateIntroText, handleOptionColor, handleOptionVariant } from "./utils";

export function Component() {
  const navigate = useNavigate();
  const { quizId, attemptId } = useParams();
  const {
    user: { userId },
    isAdmin,
  } = useUserStore();

  const [deleteAttempt] = useMutation(DELETE_ATTEMPT, {
    onCompleted: async () => {
      toast.success("Attempt deleted successfully!");
      navigate(-1);
    },
  });

  const [fetchQuizAttempts, { data: quizAttempts, loading: loadingAllAttempts }] = useLazyQuery(GET_QUIZ_ATTEMPTS);

  useEffect(() => {
    if (quizId && userId) fetchQuizAttempts({ variables: { quizId } });
  }, [quizId, userId]);

  const { data: currentAttempt, loading: loadingCurrentAttempt } = useQuery(GET_ATTEMPT_BY_ID, {
    variables: { attemptId: attemptId || "" },
  });
  const attempt = currentAttempt?.attemptById;
  const quiz = attempt?.quiz;
  const userCountryDetails = useCountryDetails(attempt?.user?.country || "");
  const quizCountryDetails = useCountryDetails(quiz?.country || "");
  const totalQuestions = attempt?.questions.length || 0;
  const creatorName = `${quiz?.creator.firstName} ${quiz?.creator.lastName}`;
  const attemptUserName = attempt?.user?.firstName;

  if (loadingCurrentAttempt && !currentAttempt)
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
        <Link className="opacity-60" to={`/game/quiz/${quizId}`}>
          Quiz
        </Link>
        <Link to="">Attempt</Link>
      </Breadcrumbs>

      <section className="container">
        <Typography variant="h1" className="mb-4 text-4xl md:text-6xl">
          {generateIntroText(attempt?.percentage || 0)} {attemptUserName}!
        </Typography>

        <Typography variant="lead" className="mb-2 flex gap-2 text-lg md:mb-5 md:text-2xl">
          In your last attempt you have guessed {attempt?.correctOptions} out of {totalQuestions} questions.
          <ScoreChip percentage={attempt?.percentage || 0} />
        </Typography>

        <div className="flex gap-2">
          <Typography className="font-medium">Rate the quiz</Typography>

          <AttemptRating attemptId={attemptId || ""} rating={attempt?.rating || undefined} />
        </div>

        <div className="mb-4 mt-2 flex flex-col gap-2 md:mt-5">
          <Typography variant="small" className="flex items-center">
            <ChevronRight className="size-4" /> Started at {format(new Date(attempt?.startTime), DATE_FORMAT)}
          </Typography>
          <Typography variant="small" className="flex items-center">
            <ChevronRight className="size-4" /> Finished at {format(new Date(attempt?.endTime), DATE_FORMAT)}
          </Typography>
        </div>
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
            <Typography variant="h2" className="mt-8 flex items-center text-xl md:text-3xl">
              <img
                src={quizCountryDetails?.flags.svg}
                alt={quizCountryDetails?.name}
                className="mr-2 size-5 rounded-full object-cover"
              />
              {quiz?.title}
            </Typography>

            <Typography className="flex items-center">
              Quiz made by <span className="ml-1 font-medium">{creatorName}</span>
              <img
                src={userCountryDetails?.flags.svg}
                alt={userCountryDetails?.name}
                className="ml-1 size-5 rounded-full object-cover"
              />
            </Typography>

            <Typography variant="h2" className="mt-2 text-xl font-medium md:text-3xl">
              Review your answers
            </Typography>

            <div className="flex flex-col">
              {attempt?.questions?.map(({ question, options, type }) => (
                <>
                  <Typography className="mb-2 text-lg font-medium md:text-xl">{question}</Typography>

                  <div className="mb-5 flex flex-wrap gap-3">
                    {type === QuestionType.Single &&
                      options.map(({ text, correct, chosen }) => (
                        <Button
                          key={text}
                          fullWidth
                          variant={handleOptionVariant(correct, !!chosen)}
                          color={handleOptionColor(correct, !!chosen)}
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
            <Typography variant="h2" className="mt-8 text-xl font-medium md:text-3xl">
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
                      <AttemptRow
                        key={id}
                        canNavigate={isAdmin}
                        percentage={percentage}
                        minutes={minutes}
                        seconds={seconds}
                        index={index}
                        quizId={quizId || ""}
                        attemptId={id}
                        name={user.firstName}
                      />
                    );
                  })}
                </List>
              )}
            </div>
          </section>
        </div>
        {isAdmin && (
          <Button
            variant="outlined"
            color="red"
            className="mt-6"
            size="sm"
            onClick={() => deleteAttempt({ variables: { attemptId: attemptId || "" } })}
          >
            Delete attempt
          </Button>
        )}
      </section>
    </div>
  );
}
