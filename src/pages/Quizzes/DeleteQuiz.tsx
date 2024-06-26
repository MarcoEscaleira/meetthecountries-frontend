import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { CANCEL_QUIZ } from "@utils/queries/CancelQuiz.ts";
import { GET_QUIZZES } from "@utils/queries/Quizzes.ts";

export function DeleteQuiz({ quizId }: { quizId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = () => setIsOpen(!isOpen);

  const [quizCancelMutation, { loading: isLoadingQuizCancellation }] = useMutation(CANCEL_QUIZ, {
    variables: { quizId },
    onCompleted: async () => {
      toggleDialog();
      toast.success("Quiz cancelled successfully!");
    },
    refetchQueries: [GET_QUIZZES],
  });

  return (
    <>
      <IconButton size="sm" variant="text" onClick={toggleDialog}>
        <X className="size-5 stroke-red-500" />
      </IconButton>

      <Dialog open={isOpen} handler={toggleDialog}>
        <DialogHeader>Are you sure you want to delete this quiz?</DialogHeader>
        <DialogBody>
          <Typography>
            This action will make a soft delete of the quiz by making it with status <b>cancelled</b>. Also, it will
            delete all existing <b>attempts</b> from every user.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="gray" onClick={toggleDialog} className="mr-4">
            Go back
          </Button>
          <Button
            variant="filled"
            color="red"
            loading={isLoadingQuizCancellation}
            disabled={isLoadingQuizCancellation}
            onClick={() => quizCancelMutation()}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
