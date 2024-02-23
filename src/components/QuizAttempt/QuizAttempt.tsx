import { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { X, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { toast } from "react-toastify";
import useBreakpoint from "use-breakpoint";
import { QuizAttemptDialog } from "@components/QuizAttemptDialog/QuizAttemptDialog.tsx";
import { QuestionType, QuizByIdQuery } from "@generated/graphql.ts";
import { useAttemptStore } from "@state/attemptStore.ts";
import { useUserStore } from "@state/userStore.ts";
import { BREAKPOINTS, COLOURS } from "@utils/constants.ts";

interface QuizAttemptProps {
  quiz: QuizByIdQuery["quizList"][0];
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
    if (quizTimeLimit > 0) {
      restart(expiryTimestamp);
    }

    if (!isAttemptRunning) {
      pause();
    }
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
    <div className="container mt-6 flex flex-col items-center">
      <div className="mb-6 flex w-full items-center justify-between md:pr-3">
        <Typography className="">
          {currentQuestion + 1} out of {questions.length} question{questions.length > 1 ? "s" : ""}
        </Typography>

        <Typography className="flex gap-1 text-xl font-light">
          <Timer />
          {minutes}:{seconds}
        </Typography>

        <Button
          variant="outlined"
          color="red"
          size="sm"
          onClick={() => {
            resetAttempt();
            toast.success("Quiz attempt cancelled successfully!");
          }}
        >
          {breakpoint === "mobile" ? <X className="size-6" /> : "Cancel attempt"}
        </Button>
      </div>

      <Typography className="text-xl font-bold">{question.question}</Typography>

      <div className="mt-10 flex flex-wrap gap-4">
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

        {question.type === QuestionType.Multi && <Typography>Multi choice not yet supported</Typography>}
      </div>
    </div>
  );
}
