import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { QuizForm } from "@components/Quiz/QuizForm.tsx";
import { Roles } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";

export function Component() {
  const { quizId } = useParams();
  const {
    user: { role },
  } = useUserStore();

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto px-4 pb-4 pt-16 md:px-12 md:pt-24">
      {quizId ? (
        <Typography variant="h2">Edit quiz</Typography>
      ) : (
        <Typography variant="h2">{role === Roles.Admin ? "Create a new quiz" : "Submit a quiz"}</Typography>
      )}

      <div className="mt-4 w-full py-1 md:w-3/5">
        <QuizForm />
      </div>
    </div>
  );
}