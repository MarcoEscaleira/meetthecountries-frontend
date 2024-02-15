import { useEffect, useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
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

  useEffect(() => {
    // TODO: randomize questions array
    setQuestions(quiz.questions);
  }, [hasAttemptStarted]);

  const question = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  const toggleStartQuizDialog = () => setIsStartQuizDialogOpen(!isStartQuizDialogOpen);

  const handleOptionSelection = (correct: boolean) => {
    console.log("Answer is ", correct);

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
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                toggleStartQuizDialog();
                setHasAttemptStarted(true);
                handleQuizStart();
              }}
            >
              Let&apos;s go
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  }

  return (
    <div className="container mt-4 flex flex-col items-center pt-10">
      {/* TODO: add a timer based on quiz timeLimit */}
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
