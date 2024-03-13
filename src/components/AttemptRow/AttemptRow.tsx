import { ListItem, Typography } from "@material-tailwind/react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScoreChip } from "@components/ScoreChip/ScoreChip.tsx";

interface AttemptRowProps {
  canNavigate?: boolean;
  attemptId: string;
  quizId: string;
  percentage: number;
  minutes: number;
  seconds: number;
  index: number;
  name?: string;
}

export function AttemptRow({
  canNavigate,
  percentage,
  minutes,
  seconds,
  index,
  attemptId,
  quizId,
  name,
}: AttemptRowProps) {
  const navigate = useNavigate();

  return (
    <ListItem
      className="flex items-center"
      onClick={() => canNavigate && navigate(`/game/quiz/${quizId}/attempt/${attemptId}`)}
    >
      <div className="flex w-20 items-center">
        <Typography className="mr-2 flex-grow text-lg font-medium">{index + 1}.</Typography>

        <ScoreChip percentage={percentage} />
      </div>
      <ChevronRight className="mx-2 size-6" />
      <Typography>
        {minutes}m : {seconds}s
      </Typography>
      {name && <Typography className="ml-2 font-medium">by {name}</Typography>}
    </ListItem>
  );
}
