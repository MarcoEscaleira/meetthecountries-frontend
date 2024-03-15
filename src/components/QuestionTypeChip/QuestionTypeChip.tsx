import { Chip } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import { QuestionType } from "@generated/graphql.ts";

interface QuestionTypeChipProps {
  questionType: QuestionType;
}

export function QuestionTypeChip({ questionType }: QuestionTypeChipProps) {
  const color = {
    [QuestionType.Single]: "green",
    [QuestionType.Multi]: "blue",
  }[questionType || QuestionType.Single];

  return <Chip color={color as colors} value={questionType} size="sm" className="flex items-center justify-center" />;
}
