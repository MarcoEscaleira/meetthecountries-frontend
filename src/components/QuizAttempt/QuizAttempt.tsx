import { useEffect, useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { Timer } from "lucide-react";
import { useTimer } from "react-timer-hook";
import { QuestionData, QuizData } from "@generated/graphql.ts";

interface QuizAttemptProps {
  quiz: QuizData;
  handleQuizStart: () => void;
  handleQuizEnd: () => void;
}

export function QuizAttempt({ quiz, handleQuizStart, handleQuizEnd }: QuizAttemptProps) {
  const [isStartQuizDialogOpen, setIsStartQuizDialogOpen] = useState(false);
  const [hasAttemptStarted, setHasAttemptStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Array<QuestionData>>([]);

  const quizTimeLimit = quiz.timeLimit || 0;
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + quizTimeLimit * 60);
  const { seconds, minutes, start, restart, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    setQuestions(quiz.questions.sort(() => Math.random() - 0.5));
    setQuestionIndex(0);
    if (quizTimeLimit > 0) {
      restart(expiryTimestamp);
    }

    if (!hasAttemptStarted) {
      pause();
    }
  }, [hasAttemptStarted]);

  const question = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  const toggleStartQuizDialog = () => setIsStartQuizDialogOpen(!isStartQuizDialogOpen);

  const handleStartQuiz = () => {
    handleQuizStart();
    toggleStartQuizDialog();
    setHasAttemptStarted(true);
    if (quizTimeLimit > 0) {
      start();
    }
  };

  const handleOptionSelection = (correct: boolean) => {
    if (correct) {
      setQuestionIndex(questionIndex + 1);
    }

    if (isLastQuestion) {
      handleQuizEnd();
      setHasAttemptStarted(false);
    }
  };

  if (!hasAttemptStarted) {
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
      <div className="mb-6 flex gap-4">
        <Typography className="">
          {questionIndex + 1} out of {questions.length} question{questions.length > 1 ? "s" : ""}
        </Typography>
        <Typography className="flex gap-1 text-xl font-light">
          <Timer />
          {minutes}:{seconds}
        </Typography>
      </div>

      <Typography className="text-xl font-bold">{question.question}</Typography>

      <div className="mt-10 flex flex-wrap gap-4">
        {question.options.map(({ text, correct }) => (
          <Button
            key={text}
            fullWidth
            variant="outlined"
            className="hover:bg-blue-gray-200"
            onClick={() => {
              handleOptionSelection(correct);
            }}
          >
            {text}
          </Button>
        ))}
      </div>
    </div>
  );
}
