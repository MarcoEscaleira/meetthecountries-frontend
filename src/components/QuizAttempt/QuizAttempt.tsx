import { useEffect } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { Timer } from "lucide-react";
import { useTimer } from "react-timer-hook";
import { toast } from "react-toastify";
import { QuizByIdQuery } from "@generated/graphql.ts";
import { useAttemptStore } from "@state/attemptStore.ts";
import { useUserStore } from "@state/userStore.ts";
import { COLOURS } from "@utils/constants.ts";

interface QuizAttemptProps {
  quiz: QuizByIdQuery["quizList"][0];
}

export function QuizAttempt({ quiz }: QuizAttemptProps) {
  const { isLoggedIn } = useUserStore();
  const {
    isAttemptRunning,
    questions,
    currentQuestion,
    isStartQuizDialogOpen,
    toggleStartQuizDialog,
    startAttempt,
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
      // TODO: handle attempt submission
      resetAttempt();
    }
  };

  if (!isAttemptRunning) {
    return (
      <>
        <Button
          variant="gradient"
          className="mt-10"
          color="green"
          fullWidth
          onClick={() => {
            toggleStartQuizDialog();
          }}
        >
          Start quiz
        </Button>

        <Dialog open={isStartQuizDialogOpen} handler={toggleStartQuizDialog}>
          <DialogHeader>
            <Typography>Are you ready?</Typography>
          </DialogHeader>
          <DialogBody>
            <Typography variant="small">
              Remember, your attempt will be recorded even if you don&apos;t complete all questions.
            </Typography>
            <Typography variant="small">Timer will start as soon as you start the quiz</Typography>
          </DialogBody>
          <DialogFooter className="gap-3">
            <Button variant="gradient" color="gray" onClick={toggleStartQuizDialog}>
              Not yet
            </Button>
            <Button variant="gradient" color="green" onClick={handleStartQuiz}>
              Let&apos;s go
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  }

  return (
    <div className="container mt-6 flex flex-col items-center">
      <div className="mb-6 flex w-full items-center justify-between pr-3">
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
          }}
        >
          Cancel attempt
        </Button>
      </div>

      <Typography className="text-xl font-bold">{question.question}</Typography>

      <div className="mt-10 flex flex-wrap gap-4">
        {question.type === 0 &&
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

        {question.type === 1 && <Typography>Multi choice not yet supported</Typography>}
      </div>
    </div>
  );
}
