import { Chip } from "@material-tailwind/react";

interface TimeLimitChipProps {
  // Time limit is defined in minutes
  timeLimit: number;
}

export function TimeLimitChip({ timeLimit }: TimeLimitChipProps) {
  return <Chip value={timeLimit ? `${timeLimit} minutes` : "Unlimited time"} color="blue-gray" />;
}
