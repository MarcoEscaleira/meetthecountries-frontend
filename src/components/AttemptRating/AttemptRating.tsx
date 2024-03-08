import { useMutation } from "@apollo/client";
import { Rating } from "@material-tailwind/react";
import { toast } from "react-toastify";
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
  });

  return (
    <div className="flex">
      <Rating
        value={rating}
        readonly={Boolean(rating)}
        onChange={value => {
          if (!rating) {
            submitRating({ variables: { attemptId, rating: value } });
          }
        }}
      />
    </div>
  );
}
