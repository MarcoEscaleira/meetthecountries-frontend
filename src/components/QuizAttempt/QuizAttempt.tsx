import { useEffect } from "react";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { X, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { toast } from "react-toastify";
import useBreakpoint from "use-breakpoint";
import { QuestionTypeChip } from "@components/QuestionTypeChip/QuestionTypeChip";
import { QuizAttemptDialog } from "@components/QuizAttemptDialog/QuizAttemptDialog.tsx";
import { QuestionType, QuizByIdQuery } from "@generated/graphql.ts";
import { useAttemptStore } from "@state/attemptStore.ts";
import { useUserStore } from "@state/userStore.ts";
import { BREAKPOINTS, COLOURS } from "@utils/constants.ts";

interface QuizAttemptProps {
  quiz: QuizByIdQuery["quizById"];
}

export function QuizAttempt({ quiz }: QuizAttemptProps) {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const { isLoggedIn } = useUserStore();
  const {
    isAttemptRunning,
    questions,
    currentQuestion,
    toggleStartQuizDialog,
    startAttempt,
    submitAttempt,
    resetAttempt,
    setQuestionResponse,
  } = useAttemptStore();

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
      toggleStartQuizDialog();
      return;
    }

    startAttempt(quiz.questions, new Date().toISOString());

    // If the quiz has a time limit, then start the timer hook
    if (quizTimeLimit > 0) start();
  };

  const handleOptionSelection = (optionName: string) => {
    setQuestionResponse(optionName);

    if (isLastQuestion) {
      submitAttempt(quiz.id, navigate);
    }
  };

  if (!isAttemptRunning) {
    return (
      <>
        <Button
          variant="gradient"
          className="mt-2 md:mt-6"
          color="green"
          fullWidth
          onClick={() => {
            toggleStartQuizDialog();
          }}
        >
          Start quiz
        </Button>

        <QuizAttemptDialog handleStartQuiz={handleStartQuiz} />
      </>
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

        <Tooltip content="Cancel this quiz attempt">
          <Button
            variant="outlined"
            color="red"
            size="sm"
            className="p-2 sm:p-3"
            onClick={() => {
              resetAttempt();
              toast.success("Quiz attempt cancelled successfully!");
            }}
          >
            {breakpoint === "mobile" ? <X className="size-5" /> : "Cancel"}
          </Button>
        </Tooltip>
      </div>

      <section className="w-full">
        <Typography className="mt-4 flex items-center gap-2 text-xl font-medium">
          <QuestionTypeChip questionType={question.type} />
          {question.question}
        </Typography>

        <div className="mt-10 flex flex-wrap gap-5 sm:gap-7">
          {question.type === QuestionType.Single &&
            question.options.map(({ text }, index) => (
              <Button
                key={text}
                fullWidth
                variant="outlined"
                color={COLOURS[index]}
                onClick={() => {
                  handleOptionSelection(text);
                }}
              >
                {text}
              </Button>
            ))}

          {question.type === QuestionType.Multi &&
            question.options.map(({ text }, index) => (
              <Button
                key={text}
                fullWidth
                variant="outlined"
                color={COLOURS[index]}
                onClick={() => {
                  handleOptionSelection(text);
                }}
              >
                {text}
              </Button>
            ))}
        </div>
        <div className="mt-12 flex w-full justify-between">
          <Button variant="outlined" color="blue-gray">
            Previous
          </Button>
          <Button color="blue">Next</Button>
        </div>
      </section>
    </div>
  );
}
