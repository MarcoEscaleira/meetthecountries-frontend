import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Typography } from "@material-tailwind/react";
import { differenceInMinutes, differenceInSeconds } from "date-fns";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@state/userStore.ts";
import { GET_QUIZ_ATTEMPTS } from "@utils/queries/QuizAttempts.ts";

interface QuizAttemptProps {
  quizId: string;
}

export function AttemptHistoryTable({ quizId }: QuizAttemptProps) {
  const {
    user: { userId },
  } = useUserStore();
  const [fetchQuizAttempts, { data, loading }] = useLazyQuery(GET_QUIZ_ATTEMPTS);

  useEffect(() => {
    if (quizId && userId) fetchQuizAttempts({ variables: { quizId, userId } });
  }, [quizId, userId]);

  if (!userId) return null;

  console.log(data);

  return (
    <div className="flex w-full flex-col">
      <Typography className="font-medium">Attempt History</Typography>
      {loading ? (
        <Loader2 size={20} className="mt-4 animate-spin" />
      ) : (
        <div className="mt-4">
          {data?.attempts.map(({ id, correctOptions, startTime, endTime, quiz: { questions } }) => {
            const percentage = (correctOptions / questions.length) * 100;
            const minutes = differenceInMinutes(new Date(endTime), new Date(startTime));
            const seconds = differenceInSeconds(new Date(endTime), new Date(startTime));

            return (
              <div key={id} className="">
                {percentage}% - took {minutes} minutes and {seconds} seconds
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
