import { useQuery } from "@apollo/client";
import { Spinner, Typography } from "@material-tailwind/react";
import { GET_QUIZZES } from "@utils/queries/Quizzes.ts";

export function Component() {
  const { data, loading, error } = useQuery(GET_QUIZZES, { variables: {} });
  const quizzes = data?.quizList;

  if (loading || error)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-16 w-16" />
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-16 md:px-12 md:pt-24">
      {quizzes?.map((quiz, index) => {
        return (
          <section key={quiz.id} className="flex-grow">
            <Typography variant="h1" className="mb-3 text-xl font-medium md:text-2xl">
              Quiz {index + 1} - {quiz?.title}
            </Typography>
          </section>
        );
      })}
    </div>
  );
}
