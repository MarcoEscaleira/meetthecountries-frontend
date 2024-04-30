import { useMutation } from "@apollo/client";
import { Rating } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { GET_QUIZ_RATING } from "@utils/queries/GetQuizRating.ts";
import { SUBMIT_ATTEMPT_RATING } from "@utils/queries/SubmitAttemptRating.ts";

interface QuizRatingProps {
  attemptId: string;
  rating?: number;
}

export function AttemptRating({ attemptId, rating }: QuizRatingProps) {
  const [submitRating] = useMutation(SUBMIT_ATTEMPT_RATING, {
    onCompleted: async () => {
      toast.success("Rating submitted successfully!");
    },
    refetchQueries: [GET_QUIZ_RATING],
  });

  return (
    <div className="flex">
      <Rating
        value={rating}
        readonly={Boolean(rating)}
        onChange={value => {
          if (!rating) {
            submitRating({ variables: { attemptId, rating: value }, refetchQueries: [GET_QUIZ_RATING] });
          }
        }}
      />
    </div>
  );
}
