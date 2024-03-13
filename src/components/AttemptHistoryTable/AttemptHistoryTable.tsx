import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { List, Typography } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { AttemptRow } from "@components/AttemptRow/AttemptRow";
import { useUserStore } from "@state/userStore.ts";
import { GET_QUIZ_ATTEMPTS } from "@utils/queries/QuizAttempts.ts";

interface AttemptHistoryTableProps {
  quizId: string;
}

export function AttemptHistoryTable({ quizId }: AttemptHistoryTableProps) {
  const {
    user: { userId },
  } = useUserStore();
  const [fetchQuizAttempts, { data, loading }] = useLazyQuery(GET_QUIZ_ATTEMPTS, { fetchPolicy: "network-only" });

  useEffect(() => {
    if (quizId && userId) fetchQuizAttempts({ variables: { quizId, userId } });
  }, [quizId, userId]);

  if (!userId) return null;

  return (
    <div className="flex w-full flex-col">
      <section className="flex items-center">
        <Typography variant="h2" className="text-xl font-medium">
          Attempt History
        </Typography>
      </section>
      {!loading && data?.attempts.length === 0 && <Typography>No attempts made</Typography>}
      {loading ? (
        <Loader2 size={20} className="mt-4 animate-spin" />
      ) : (
        <List className="mt-4 flex flex-col p-0">
          {data?.attempts.map(({ id, percentage, minutes, seconds }, index) => (
            <AttemptRow
              key={id}
              canNavigate
              percentage={percentage}
              minutes={minutes}
              seconds={seconds}
              index={index}
              quizId={quizId}
              attemptId={id}
            />
          ))}
        </List>
      )}
    </div>
  );
}
