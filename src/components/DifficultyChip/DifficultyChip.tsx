import { Chip } from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/chip";
import { colors } from "@material-tailwind/react/types/generic";
import { Difficulty } from "@generated/graphql.ts";

interface DifficultyChipProps {
  // Difficulty of the quiz, if not provided then its Unknown
  difficulty?: Difficulty | null;
  size?: size;
}

export function DifficultyChip({ difficulty, size = "md" }: DifficultyChipProps) {
  const color = {
    [Difficulty.Easy]: "green",
    [Difficulty.Medium]: "yellow",
    [Difficulty.Hard]: "red",
    [Difficulty.Unknown]: "gray",
  }[difficulty || Difficulty.Unknown];

  return <Chip color={color as colors} value={difficulty} size={size} />;
}
