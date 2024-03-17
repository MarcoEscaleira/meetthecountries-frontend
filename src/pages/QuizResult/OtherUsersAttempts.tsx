import { useQuery } from "@apollo/client";
import { Typography, List } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { AttemptRow } from "@components/AttemptRow/AttemptRow";
import { useUserStore } from "@state/userStore";
import { GET_QUIZ_ATTEMPTS } from "@utils/queries";

export const OtherUsersAttempts = () => {
  const { quizId } = useParams();
  const {
    user: { userId },
    isAdmin,
  } = useUserStore();
  const { data: quizAttempts, loading: loadingAllAttempts } = useQuery(GET_QUIZ_ATTEMPTS, {
    variables: { quizId: quizId || "" },
  });

  const hasQuizAttempts = (quizAttempts?.attempts?.length || 0) > 0 && !loadingAllAttempts;

  const hasAnyAttemptFromOtherUser =
    !loadingAllAttempts && quizAttempts?.attempts.every(attempt => attempt.user.id === userId);

  return (
    <div className="flex w-72 flex-col">
      {loadingAllAttempts && <Loader2 size={20} className="mt-4 animate-spin" />}

      {hasAnyAttemptFromOtherUser && <Typography variant="small">No user has attempted this quiz.</Typography>}

      {hasQuizAttempts && (
        <List className="flex flex-col p-0">
          {quizAttempts?.attempts.map(({ id, percentage, minutes, seconds, user }, index) => {
            console.log("user", user.id, userId);
            
            if (user.id === userId) return null;

            return (
              <AttemptRow
                key={id}
                canNavigate={isAdmin}
                percentage={percentage}
                minutes={minutes}
                seconds={seconds}
                index={index}
                quizId={quizId || ""}
                attemptId={id}
                name={user.firstName}
              />
            );
          })}
        </List>
      )}
    </div>
  );
};
