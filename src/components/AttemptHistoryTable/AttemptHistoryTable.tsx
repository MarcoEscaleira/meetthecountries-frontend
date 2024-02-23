import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Button, Typography } from "@material-tailwind/react";
import { ChevronRight, Loader2 } from "lucide-react";
import { ScoreChip } from "@components/ScoreChip/ScoreChip.tsx";
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

  return (
    <div className="flex w-full flex-col">
      <section className="flex items-center justify-between">
        <Typography variant="h2" className="text-xl font-medium">
          Attempt History
        </Typography>
        <Button variant="outlined" color="deep-orange" size="sm">
          View All
        </Button>
      </section>
      {loading ? (
        <Loader2 size={20} className="mt-4 animate-spin" />
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          {data?.attempts.map(({ id, percentage, minutes, seconds }, index) => {
            return (
              <div key={id} className="flex items-center">
                <Typography className="mr-2 text-lg font-medium">{index + 1}.</Typography>
                <ScoreChip percentage={percentage} /> <ChevronRight className="mx-2 size-6" />
                <Typography className="">
                  {minutes}m : {seconds}s
                </Typography>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
