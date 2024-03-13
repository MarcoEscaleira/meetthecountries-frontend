import { COLOURS } from "@utils/constants";

export const handleOptionColor = (correct: boolean, chosen: boolean, index: number) => {
  if (chosen && !correct) return "red";
  if (correct) return "green";
  return COLOURS[index];
};

export const handleOptionVariant = (correct: boolean, chosen: boolean) => {
  if (correct || chosen) return "filled";
  return "outlined";
};

export const generateIntroText = (percentage: number) => {
  if (percentage === 100) return "Congratulations ";
  if (percentage >= 80) return "Great job ";
  if (percentage >= 50) return "Good job ";
  return "You can do better ";
};

export const DATE_FORMAT = "dd MMM yyyy hh:mm:ss";
