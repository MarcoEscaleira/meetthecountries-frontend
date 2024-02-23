import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import { ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScoreChip } from "@components/ScoreChip/ScoreChip.tsx";
import { useUserStore } from "@state/userStore.ts";
import { GET_QUIZ_ATTEMPTS } from "@utils/queries/QuizAttempts.ts";

interface QuizAttemptProps {
  quizId: string;
}

export function AttemptHistoryTable({ quizId }: QuizAttemptProps) {
  const navigate = useNavigate();
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
        <List className="mt-4 flex flex-col p-0">
          {data?.attempts.map(({ id, percentage, minutes, seconds }, index) => {
            return (
              <ListItem
                key={id}
                className="flex items-center"
                onClick={() => navigate(`/game/quiz/${quizId}/attempt/${id}`)}
              >
                <Typography className="mr-2 text-lg font-medium">{index + 1}.</Typography>
                <ScoreChip percentage={percentage} /> <ChevronRight className="mx-2 size-6" />
                <Typography className="">
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
