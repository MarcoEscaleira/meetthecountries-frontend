import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useUserStore } from "@state/userStore.ts";
import { GET_QUIZ_ATTEMPTS } from "@utils/queries/QuizAttempts.ts";

interface AttemptBadgeProps {
  quizId: string;
}

export function AttemptBadge({ quizId }: AttemptBadgeProps) {
  const {
    user: { userId },
  } = useUserStore();
  const [fetchQuizAttempts, { data, loading }] = useLazyQuery(GET_QUIZ_ATTEMPTS);

  useEffect(() => {
    if (quizId && userId) fetchQuizAttempts({ variables: { quizId, userId } });
  }, [quizId, userId]);

  if (!userId) return null;

  if (loading) return null;

  return <div className="rounded-full bg-green-500 p-1 px-3 text-sm">{data?.attempts.length} attempts</div>;
}
