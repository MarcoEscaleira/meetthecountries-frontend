import { Button, Card, CardBody, CardFooter, CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CountryQuizzesQuery } from "@generated/graphql.ts";
import { CountryInfoModal } from "@pages/Game/CountryInfoModal.tsx";
import { useCountryDetails } from "@utils/hooks/useCountryDetails.ts";
import { TimeLimitChip } from "@components/TimeLimitChip/TimeLimitChip.tsx";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";

interface CountryQuizListProps {
  quizList: CountryQuizzesQuery["quizList"];
  isLoadingCountryQuizList: boolean;
}

export const CountryQuizList = ({ quizList, isLoadingCountryQuizList }: CountryQuizListProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const countryDetails = useCountryDetails(searchParams.get("country") || "");

  if (!countryDetails) {
    return (
      <Typography variant="h3" className="mt-8 text-xl">
        👆 Get started and select a country 👆
      </Typography>
    );
  }

  const headerContent = (
    <div className="mb-4 mt-6 flex w-full items-center justify-center gap-8 border-b-2 px-2 pb-4 md:mt-8 md:px-0">
      <Typography variant="h2" className="flex items-center gap-2 text-2xl">
        <img src={countryDetails.flags.svg} alt={countryDetails.name} className="h-5 w-5 rounded-full object-cover" />

        {countryDetails.name}
      </Typography>

      <CountryInfoModal countryDetails={countryDetails} />
    </div>
  );

  if (isLoadingCountryQuizList) {
    return (
      <>
        {headerContent} <Spinner className="mt-10 h-14 w-14" />
      </>
    );
  }

  if (quizList.length === 0) {
    return (
      <>
        {headerContent} <Typography className="mt-6">No quizzes found for this country 🥹</Typography>
        <div className="mt-4 flex items-center">
          <Typography>Please try again later or&nbsp;</Typography>
          <Button variant="text" className="px-1">
            create your quiz
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {headerContent}

      {quizList.map(({ id, title, image, description, timeLimit, difficulty }) => (
        <Card key={title} className="w-full max-w-[20rem] shadow-lg">
          <CardHeader floated={false} color="blue-gray" className="flex items-center justify-center pt-3">
            <img src={image} alt="the background for the quiz" className="h-40" />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          </CardHeader>
          <CardBody>
            <div className="mb-3 flex items-center justify-start">
              <Typography variant="h5" color="blue-gray" className="font-medium">
                {title}
              </Typography>
            </div>
            <Typography color="gray">{description}</Typography>
            <div className="flex gap-3">
              <DifficultyChip difficulty={difficulty} />
              <TimeLimitChip timeLimit={timeLimit || 0} />
            </div>
          </CardBody>
          <CardFooter className="">
            <Button size="md" color="blue" fullWidth={true} onClick={() => navigate(`/game/quiz/${id}`)}>
              Go to quiz
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
