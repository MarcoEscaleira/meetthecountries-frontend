import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useAttemptStore } from "@state/attemptStore.ts";

export function QuizAttemptCancelDialog() {
  const { isCancelQuizDialogOpen, toggleCancelQuizDialog, resetAttempt } = useAttemptStore();

  return (
    <Dialog open={isCancelQuizDialogOpen} handler={toggleCancelQuizDialog} className="outline-none">
      <DialogHeader>
        <Typography className="text-xl font-medium">Are you sure?</Typography>
      </DialogHeader>
      <DialogBody>
        <Typography>You were doing so doing so well! Are you sure you want to cancel the quiz attempt?</Typography>
      </DialogBody>
      <DialogFooter className="gap-3">
        <Button
          variant="gradient"
          color="red"
          onClick={() => {
            resetAttempt();
            toggleCancelQuizDialog();
            toast.success("Quiz attempt cancelled successfully!");
          }}
        >
          Cancel
        </Button>
        <Button variant="outlined" color="gray" onClick={toggleCancelQuizDialog}>
          Continue
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
