import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { DELETE_QUIZ_COMMENT } from "@utils/queries/DeleteComment";
import { GET_QUIZ_COMMENTS } from "@utils/queries/QuizComments";

interface CommentDeleteDialogProps {
  commentId: string;
}

export function CommentDeleteDialog({ commentId }: CommentDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const [deleteComment, { loading: loadingDeleteComment }] = useMutation(DELETE_QUIZ_COMMENT, {
    onCompleted: () => {
      toggle();
      toast.success("Comment deleted successfully!");
    },
    refetchQueries: [GET_QUIZ_COMMENTS],
  });

  return (
    <>
      <Button onClick={toggle} variant="text" color="red">
        Delete
      </Button>
      <Dialog open={open} handler={toggle} size="xs" className="outline-none">
        <DialogHeader>
          <Typography className="text-xl font-medium">Are you sure?</Typography>
        </DialogHeader>
        <DialogBody>
          <Typography>This action is not revertible.</Typography>
        </DialogBody>
        <DialogFooter className="gap-3">
          <Button
            variant="gradient"
            color="red"
            loading={loadingDeleteComment}
            onClick={() => {
              deleteComment({ variables: { commentId } });
            }}
          >
            Delete
          </Button>
          <Button variant="outlined" color="gray" onClick={toggle}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
