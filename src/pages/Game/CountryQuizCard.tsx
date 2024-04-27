import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { AttemptBadge } from "@components/AttemptBadge/AttemptBadge.tsx";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";
import { QuizRating } from "@components/QuizRating/QuizRating.tsx";
import { TimeLimitChip } from "@components/TimeLimitChip/TimeLimitChip.tsx";
import { Difficulty } from "@generated/graphql";

interface CountryQuizCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty?: Difficulty;
  timeLimit?: number;
}

export const CountryQuizCard = ({ id, image, title, description, difficulty, timeLimit }: CountryQuizCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full max-w-[20rem] cursor-pointer border border-gray-200 shadow-lg transition-all hover:border hover:border-blue-500 active:scale-95"
      onClick={() => navigate(`/game/quiz/${id}`)}
    >
      <CardHeader floated={false} color="blue-gray" className="flex items-center justify-center pt-3">
        <img src={image} alt="the background for the quiz" className="h-40" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <div className="!absolute bottom-2 left-2">
          <QuizRating quizId={id} />
        </div>
        <div className="!absolute right-2 top-2">
          <AttemptBadge quizId={id} />
        </div>
      </CardHeader>
      <CardBody className="flex-grow">
        <div className="mb-3 flex items-center justify-start">
          <Typography variant="h5" color="blue-gray" className="font-medium" style={{ wordBreak: "break-word" }}>
            {title}
          </Typography>
        </div>
        <Typography color="gray" className="break-words">
          {description}
        </Typography>
        <div className="mt-4 flex flex-wrap gap-3">
          <DifficultyChip difficulty={difficulty} />
          <TimeLimitChip timeLimit={timeLimit || 0} />
        </div>
      </CardBody>
      <CardFooter className="px-6 pb-4 pt-0">
        <Button size="md" color="black" fullWidth={true} onClick={() => navigate(`/game/quiz/${id}`)}>
          Go to quiz
        </Button>
      </CardFooter>
    </Card>
  );
};
