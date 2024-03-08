import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { List, ListItem, Typography } from "@material-tailwind/react";
import { ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScoreChip } from "@components/ScoreChip/ScoreChip.tsx";
import { useUserStore } from "@state/userStore.ts";
import { GET_QUIZ_ATTEMPTS } from "@utils/queries/QuizAttempts.ts";

interface AttemptHistoryTableProps {
  quizId: string;
}

export function AttemptHistoryTable({ quizId }: AttemptHistoryTableProps) {
  const navigate = useNavigate();
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
          {data?.attempts.map(({ id, percentage, minutes, seconds }, index) => {
            return (
              <ListItem
                key={id}
                className="flex items-center"
                onClick={() => navigate(`/game/quiz/${quizId}/attempt/${id}`)}
              >
                <div className="flex w-20 items-center">
                  <Typography className="mr-2 flex-grow text-lg font-medium">{index + 1}.</Typography>

                  <ScoreChip percentage={percentage} />
                </div>
                <ChevronRight className="mx-2 size-6" />
                <Typography>
                  {minutes}m : {seconds}s
                </Typography>
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
}
