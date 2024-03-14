import { Typography } from "@material-tailwind/react";

export const ErrorText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <Typography variant="small" color="red" className={`mt-1 font-medium ${className}`}>
      {text}
    </Typography>
  );
};
