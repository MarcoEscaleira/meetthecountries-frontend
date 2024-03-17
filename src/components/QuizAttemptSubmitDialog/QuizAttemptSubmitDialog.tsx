import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAttemptStore } from "@state/attemptStore.ts";

export function QuizAttemptSubmitDialog({ quizId }: { quizId: string }) {
  const navigate = useNavigate();
  const { isSubmitQuizDialogOpen, toggleSubmitQuizDialog, submitAttempt } = useAttemptStore();

  return (
    <Dialog open={isSubmitQuizDialogOpen} handler={toggleSubmitQuizDialog} className="outline-none">
      <DialogHeader>
        <Typography className="text-xl font-medium">Are you sure?</Typography>
      </DialogHeader>
      <DialogBody>
        <Typography>Confirm all your answers and submit your attempt below</Typography>
      </DialogBody>
      <DialogFooter className="gap-3">
        <Button
          variant="outlined"
          color="gray"
          onClick={() => {
            toggleSubmitQuizDialog();
          }}
        >
          Go back
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => {
            toggleSubmitQuizDialog();
            submitAttempt(quizId, navigate);
          }}
        >
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
