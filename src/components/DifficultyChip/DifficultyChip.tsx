import { Chip } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import { Difficulty } from "@generated/graphql.ts";

interface DifficultyChipProps {
  // Difficulty of the quiz, if not provided then its Unknown
  difficulty?: Difficulty | null;
}

export function DifficultyChip({ difficulty }: DifficultyChipProps) {
  const color = {
    [Difficulty.Easy]: "green",
    [Difficulty.Medium]: "yellow",
    [Difficulty.Hard]: "red",
    [Difficulty.Unknown]: "gray",
  }[difficulty || Difficulty.Unknown];

  return <Chip color={color as colors} value={difficulty} />;
}
