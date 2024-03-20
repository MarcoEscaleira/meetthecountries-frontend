import { useState } from "react";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { List, Button, Popover, PopoverContent, PopoverHandler, Textarea, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { MoreHorizontal, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { CommentDeleteDialog } from "@components/CommentDeleteDialog/CommentDeleteDialog";
import { QuizCommentsQuery } from "@generated/graphql";
import { useUserStore } from "@state/userStore";
import { GET_QUIZ_COMMENTS } from "@utils/queries/QuizComments";
import { UPDATE_QUIZ_COMMENT } from "@utils/queries/UpdateComment";
import { quizCommentFormSchema } from "./utils";

interface CommentProps {
  comment: QuizCommentsQuery["quizComments"][0];
}

export const Comment = ({
  comment: {
    id: commentId,
    text,
    createdAt,
    user: { id: commentUserId, firstName, lastName },
  },
}: CommentProps) => {
  const [isEditingId, setIsEditingId] = useState("");
  const {
    user: { userId },
  } = useUserStore();

  const [updateComment, { loading: loadingUpdateComment }] = useMutation(UPDATE_QUIZ_COMMENT, {
    onCompleted: () => {
      setIsEditingId("");
      toast.success("Comment updated successfully!");
    },
    refetchQueries: [GET_QUIZ_COMMENTS],
  });

  const form = useForm<z.infer<typeof quizCommentFormSchema>>({
    resolver: zodResolver(quizCommentFormSchema),
    defaultValues: {
      text: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<z.infer<typeof quizCommentFormSchema>> = async (values, event) => {
    event?.preventDefault();
    try {
      updateComment({ variables: { commentId: isEditingId, text: values.text } });
      form.reset();
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  return (
    <div key={commentId} className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <User className="mr-2 size-4" />
          <Typography className="font-medium">
            {firstName}&nbsp;
            {lastName}
          </Typography>
          <Typography variant="small" className="ml-2 opacity-70">
            {format(new Date(createdAt), "dd MMM yyyy")}
          </Typography>
        </div>

        {commentUserId === userId && (
          <Popover>
            <PopoverHandler>
              <MoreHorizontal className="size-5 opacity-80 hover:cursor-pointer" />
            </PopoverHandler>
            <PopoverContent className="p-0">
              <List>
                <Button
                  variant="text"
                  color="gray"
                  className="outline-none"
                  onClick={() => {
                    setIsEditingId(commentId);
                    form.reset({ text });
                  }}
                >
                  Edit
                </Button>

                <CommentDeleteDialog commentId={commentId} />
              </List>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {isEditingId ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <Textarea {...register("text")} size="lg" label="Comment" error={!!errors.text} />
          <div className=" mt-2 flex items-center gap-4">
            <Button
              color="blue"
              type="submit"
              loading={loadingUpdateComment}
              disabled={loadingUpdateComment || !form.formState.isDirty}
            >
              Update
            </Button>
            <Button color="gray" variant="outlined" type="reset" onClick={() => setIsEditingId("")}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Typography className="whitespace-pre-line">{text}</Typography>
      )}
    </div>
  );
};
