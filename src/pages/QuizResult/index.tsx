import { useQuery } from "@apollo/client";
import { Breadcrumbs, Button, Spinner, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ScoreChip } from "@components/ScoreChip/ScoreChip.tsx";
import { useCountryDetails } from "@utils/hooks/useCountryDetails.ts";
import { GET_ATTEMPT_RESULT } from "@utils/queries/AttemptResult.ts";

export function Component() {
  const navigate = useNavigate();
  const { quizId, attemptId } = useParams();

  const { data, loading } = useQuery(GET_ATTEMPT_RESULT, { variables: { attemptId: attemptId || "" } });
  const attempt = data?.attempts[0];
  const quiz = data?.attempts[0]?.quiz;
  const countryDetails = useCountryDetails(quiz?.country || "");

  if (loading && !data)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-16 w-16" />
      </div>
    );

  const totalQuestions = attempt?.quiz.questions.length || 0;

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-16 md:px-12 md:pt-24">
      <Breadcrumbs className="mb-8 flex items-center">
        <Link to={`/game?country=${quiz?.country}`} className="opacity-60">
          Game
        </Link>
        <Link to={`/game/quiz/${quizId}`}>Quiz</Link>
        <Link to="">Attempt</Link>
      </Breadcrumbs>

      <Typography variant="h1" className="mb-4 text-4xl md:text-6xl">
        Well done {attempt?.user?.firstName}!
      </Typography>

      <Typography variant="lead" className="mb-6 text-xl md:text-3xl">
        In your last attempt you have guessed {attempt?.correctOptions} out of {totalQuestions} questions.
      </Typography>

      <ScoreChip percentage={attempt?.percentage || 0} />

      <div className="mb-4 mt-6 flex flex-col gap-2">
        <Typography variant="small" className="flex items-center">
          <ChevronRight className="size-4" /> {format(new Date(attempt?.startTime), "dd/MM/yyyy mm:ss")}
        </Typography>
        <Typography variant="small" className="flex items-center">
          <ChevronRight className="size-4" /> {format(new Date(attempt?.endTime), "dd/MM/yyyy mm:ss")}
        </Typography>
      </div>
      <Typography className="flex items-center font-medium">
        Quiz made by {attempt?.quiz?.creator.firstName} {attempt?.quiz?.creator.lastName}
        <img
          src={countryDetails?.flags.svg}
          alt={countryDetails?.name}
          className="ml-1 size-5 rounded-full object-cover"
        />
      </Typography>
      <div className="mt-8 flex items-center gap-4">
        <Button color="light-blue" onClick={() => navigate(`/game?country=${attempt?.quiz.country}`)}>
          Go to country
        </Button>
        <Button color="blue-gray" onClick={() => navigate(`/game/quiz/${quizId}`)}>
          Go back
        </Button>
      </div>
    </div>
  );
}
