import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Textarea, Typography } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useUserStore } from "@state/userStore.ts";
import { CREATE_QUIZ_COMMENT } from "@utils/queries/CreateComment";
import { GET_QUIZ_COMMENTS } from "@utils/queries/QuizComments";
import { Comment } from "./Comment";
import { quizCommentFormSchema } from "./utils";

export function QuizComments() {
  const { quizId } = useParams();
  const {
    user: { userId },
  } = useUserStore();

  const [createComment, { loading: loadingCreateComment }] = useMutation(CREATE_QUIZ_COMMENT, {
    refetchQueries: [GET_QUIZ_COMMENTS],
  });

  const { data, loading } = useQuery(GET_QUIZ_COMMENTS, {
    fetchPolicy: "network-only",
    variables: { quizId: quizId || "" },
  });
  const comments = data?.quizComments || [];

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
      createComment({ variables: { comment: { text: values.text, quiz: quizId || "", user: userId } } });
      form.reset();
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  return (
    <Card className="mt-6 w-[600px]">
      <CardHeader floated={false} shadow={false}>
        <Typography variant="h4" className="font-medium">
          Discussion ({comments.length})
        </Typography>
      </CardHeader>
      <CardBody>
        {userId && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea {...register("text")} size="lg" label="Comment" error={!!errors.text} />
            <Button
              color="blue"
              type="submit"
              loading={loadingCreateComment}
              disabled={loadingCreateComment || !form.formState.isDirty}
              className="mt-2"
            >
              Post a comment
            </Button>
          </form>
        )}

        <section className="mt-6 flex flex-col gap-6">
          {loading ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            comments.map(comment => <Comment key={comment.id} comment={comment} />)
          )}
        </section>
      </CardBody>
    </Card>
  );
}
