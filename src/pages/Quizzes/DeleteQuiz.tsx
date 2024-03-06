import { useState } from "react";
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

export function DeleteQuiz({}: { quizId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = () => setIsOpen(!isOpen);

  return (
    <>
      <IconButton size="sm" variant="text" onClick={toggleDialog}>
        <X className="size-4 stroke-red-500" />
      </IconButton>

      <Dialog open={isOpen} handler={toggleDialog}>
        <DialogHeader>Are you sure you want to delete this quiz?</DialogHeader>
        <DialogBody>
          <Typography>This action will make a soft delete of the quiz.</Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="gray" onClick={toggleDialog} className="mr-2">
            Go back
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => {
              toast.success("Quiz deleted successful");
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
