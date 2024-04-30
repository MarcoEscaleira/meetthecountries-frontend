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
import { Check } from "lucide-react";
import { toast } from "react-toastify";
import { GET_COUNTRY_QUIZZES, GET_QUIZ_ATTEMPTS, GET_QUIZ_RATING } from "@utils/queries";
import { APPROVE_QUIZ } from "@utils/queries/ApproveQuiz.ts";
import { GET_QUIZ_COMMENTS } from "@utils/queries/QuizComments.ts";
import { GET_QUIZZES } from "@utils/queries/Quizzes.ts";

export function ApproveQuiz({ quizId }: { quizId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = () => setIsOpen(!isOpen);

  const [quizApprovalMutation, { loading: isLoadingQuizApproval }] = useMutation(APPROVE_QUIZ, {
    variables: { quizId },
    onCompleted: async () => {
      toggleDialog();
      toast.success("Quiz approved successfully!");
    },
  });

  return (
    <>
      <IconButton size="sm" variant="text" onClick={toggleDialog}>
        <Check className="size-5 stroke-green-500" />
      </IconButton>

      <Dialog open={isOpen} handler={toggleDialog}>
        <DialogHeader>Are you sure you want to approve this quiz?</DialogHeader>
        <DialogBody>
          <Typography>This action will make the quiz available for all users to play.</Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="gray" onClick={toggleDialog} className="mr-4">
            Go back
          </Button>
          <Button
            variant="filled"
            color="green"
            loading={isLoadingQuizApproval}
            disabled={isLoadingQuizApproval}
            onClick={() =>
              quizApprovalMutation({
                refetchQueries: [
                  GET_QUIZZES,
                  GET_COUNTRY_QUIZZES,
                  GET_QUIZ_ATTEMPTS,
                  GET_QUIZ_RATING,
                  GET_QUIZ_COMMENTS,
                ],
              })
            }
          >
            Approve
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
