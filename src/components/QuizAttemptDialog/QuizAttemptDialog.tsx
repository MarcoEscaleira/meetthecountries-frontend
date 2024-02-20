import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { useAttemptStore } from "@state/attemptStore.ts";

interface QuizAttemptDialogProps {
  handleStartQuiz: () => void;
}

export function QuizAttemptDialog({ handleStartQuiz }: QuizAttemptDialogProps) {
  const { isStartQuizDialogOpen, toggleStartQuizDialog } = useAttemptStore();

  return (
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
  );
}
