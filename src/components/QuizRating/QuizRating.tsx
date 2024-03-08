import { useQuery } from "@apollo/client";
import { Rating } from "@material-tailwind/react";
import { GET_QUIZ_RATING } from "@utils/queries/GetQuizRating.ts";

interface QuizRatingProps {
  quizId: string;
}

export function QuizRating({ quizId }: QuizRatingProps) {
  const { data, loading } = useQuery(GET_QUIZ_RATING, { variables: { quizId } });

  if (loading) return null;

  const ratingValue = data?.quizRating;

  return (
    <div className="flex">
      <Rating value={ratingValue} readonly />
    </div>
  );
}
