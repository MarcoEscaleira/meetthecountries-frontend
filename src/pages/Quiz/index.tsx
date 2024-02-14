import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

export function Component() {
  const { quizId } = useParams();

  return (
    <div className="container flex h-full flex-col items-center p-6 md:p-12">
      <Typography variant="h1" className="mb-8 mt-16 text-3xl font-light md:mt-2 md:text-5xl">
        Quiz: {quizId}
      </Typography>
    </div>
  );
}
