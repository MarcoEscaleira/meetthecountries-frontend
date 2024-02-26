import { useState } from "react";
import { Button, Dialog, DialogBody, DialogHeader, IconButton } from "@material-tailwind/react";
import { X } from "lucide-react";
import { Roles } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";
import { QuizForm } from "./QuizForm.tsx";

interface CreateQuizDialogProps {
  simpleButton?: boolean;
}

export function CreateQuizDialog({ simpleButton }: CreateQuizDialogProps) {
  const {
    user: { role },
  } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = () => setIsOpen(!isOpen);

  const title = role === Roles.Admin ? "Create a new quiz" : "Submit a quiz";

  return (
    <>
      <Button
        variant={simpleButton ? "text" : "gradient"}
        color={simpleButton ? "blue-gray" : "green"}
        size="md"
        onClick={toggleDialog}
        className={simpleButton ? "px-1" : "my-10"}
      >
        {title}
      </Button>

      <Dialog open={isOpen} handler={toggleDialog} dismiss={{ outsidePress: false }}>
        <DialogHeader className="flex items-center justify-between">
          {title}
          <IconButton onClick={toggleDialog}>
            <X className="size-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="h-[42rem] overflow-scroll">
          <QuizForm />
        </DialogBody>
      </Dialog>
    </>
  );
}
