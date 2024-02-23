import { Chip } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";

interface ScoreChipProps {
  percentage: number;
}

export function ScoreChip({ percentage }: ScoreChipProps) {
  let color;
  if (percentage < 25) {
    color = "red";
  } else if (percentage < 50) {
    color = "orange";
  } else if (percentage < 75) {
    color = "yellow";
  } else {
    color = "green";
  }

  return <Chip color={color as colors} value={`${percentage}%`} />;
}
