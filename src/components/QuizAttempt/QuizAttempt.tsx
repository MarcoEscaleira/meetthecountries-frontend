import { useEffect } from "react";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { X, Timer } from "lucide-react";
import { useTimer } from "react-timer-hook";
import { toast } from "react-toastify";
import useBreakpoint from "use-breakpoint";
import { QuestionTypeChip } from "@components/QuestionTypeChip/QuestionTypeChip";
import { QuizAttemptCancelDialog } from "@components/QuizAttemptCancelDialog/QuizAttemptCancelDialog";
import { QuizAttemptSubmitDialog } from "@components/QuizAttemptSubmitDialog/QuizAttemptSubmitDialog";
import { QuizByIdQuery } from "@generated/graphql.ts";
import { useAttemptStore } from "@state/attemptStore.ts";
import { useUserStore } from "@state/userStore.ts";
import { BREAKPOINTS } from "@utils/constants.ts";

interface QuizAttemptProps {
  quiz: QuizByIdQuery["quizById"];
}

export function QuizAttempt({ quiz }: QuizAttemptProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const { isLoggedIn } = useUserStore();
  const {
    isAttemptRunning,
    questions,
    currentQuestion,
    toggleCancelQuizDialog,
    toggleSubmitQuizDialog,
    startAttempt,
    resetAttempt,
    setQuestionResponse,
    goToPreviousQuestion,
    goToNextQuestion,
  } = useAttemptStore();

  useEffect(() => () => resetAttempt(), []);

  const quizTimeLimit = quiz.timeLimit || 0;
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + quizTimeLimit * 60);
  const { seconds, minutes, start, restart, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    if (quizTimeLimit > 0) restart(expiryTimestamp);

    if (!isAttemptRunning) pause();
  }, [isAttemptRunning]);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleStartQuiz = () => {
    if (!isLoggedIn) {
      toast.warn("Please login before starting a quiz attempt.");
      return;
    }

    startAttempt(quiz.questions, new Date().toISOString());

    // If the quiz has a time limit, then start the timer hook
    if (quizTimeLimit > 0) start();
  };

  if (!isAttemptRunning) {
    return (
      <Button variant="gradient" className="mt-2 md:mt-6" color="green" fullWidth onClick={handleStartQuiz}>
        Start quiz
      </Button>
    );
  }

  return (
    <div className="container mt-6 flex max-w-[500px] flex-col items-center">
      <div className="mb-6 flex w-full items-center justify-between">
        <div className="flex flex-col items-end gap-1">
          {minutes > 0 || seconds > 0 ? (
            <Typography className="flex gap-1 text-xl font-medium">
              <Timer />
              {minutes}:{seconds}
            </Typography>
          ) : (
            <Typography className="text-l flex gap-1">
              <Timer /> No limit
            </Typography>
          )}
          <Typography className="font-medium">
            {currentQuestion + 1} out of {questions.length}
          </Typography>
        </div>

        <>
          <Tooltip content="Cancel this quiz attempt">
            <Button
              variant="outlined"
              color="red"
              size="sm"
              className="p-2 sm:p-3"
              onClick={() => {
                toggleCancelQuizDialog();
              }}
            >
              {breakpoint === "mobile" ? <X className="size-5" /> : "Cancel"}
            </Button>
          </Tooltip>

          <QuizAttemptCancelDialog />
        </>
      </div>

      <section className="w-full">
        <Typography className="mt-4 flex items-center gap-2 text-xl font-medium">
          <QuestionTypeChip questionType={question.type} />
          {question.question}
        </Typography>

        {question.image && (
          <div className="mt-6 flex w-full justify-center">
            <img src={question.image} alt="question figure" className="size-[300px]" />
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-5 sm:gap-7">
          {question.options.map(({ text, chosen }) => (
            <Button
              key={text}
              fullWidth
              variant={chosen ? "filled" : "outlined"}
              color="blue-gray"
              className="outline-none transition-all active:scale-95 h-11"
              onClick={() => setQuestionResponse(text)}
            >
              {text}
            </Button>
          ))}
        </div>
        <div className="mt-12 flex w-full justify-between">
          <Button variant="outlined" color="gray" disabled={currentQuestion === 0} onClick={goToPreviousQuestion}>
            Previous
          </Button>
          {isLastQuestion ? (
            <>
              <Button
                variant="gradient"
                color="green"
                onClick={() => {
                  toggleSubmitQuizDialog();
                }}
              >
                Finish
              </Button>
              <QuizAttemptSubmitDialog quizId={quiz.id} />
            </>
          ) : (
            <Button color="blue" onClick={goToNextQuestion}>
              Next
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
