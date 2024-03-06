import { Chip } from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/chip";
import { colors } from "@material-tailwind/react/types/generic";
import { QuizStatus } from "@generated/graphql.ts";

interface QuizStatusChipProps {
  status?: QuizStatus;
  size?: size;
}

export function QuizStatusChip({ status, size = "md" }: QuizStatusChipProps) {
  const color = {
    [QuizStatus.Pending]: "blue",
    [QuizStatus.Approved]: "green",
    [QuizStatus.Cancelled]: "red",
  }[status || QuizStatus.Pending];

  return (
    <Chip
      color={color as colors}
      value={status?.toString()}
      size={size}
      className="flex items-center justify-center rounded-full"
    />
  );
}
