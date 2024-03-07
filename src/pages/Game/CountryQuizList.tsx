import { Button, Card, CardBody, CardFooter, CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AttemptBadge } from "@components/AttemptBadge/AttemptBadge.tsx";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";
import { TimeLimitChip } from "@components/TimeLimitChip/TimeLimitChip.tsx";
import { CountryQuizzesQuery } from "@generated/graphql.ts";
import { CountryInfoModal } from "@pages/Game/CountryInfoModal.tsx";
import { useUserStore } from "@state/userStore.ts";
import { useCountryDetails } from "@utils/hooks/useCountryDetails.ts";

interface CountryQuizListProps {
  quizList: CountryQuizzesQuery["quizzesByCountry"];
  isLoadingCountryQuizList: boolean;
}

export const CountryQuizList = ({ quizList, isLoadingCountryQuizList }: CountryQuizListProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useUserStore();

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
        {headerContent} <Typography className="mt-6">No quizzes found for this country.</Typography>
        <div className="mt-4 flex items-center">
          <Typography className="pl-1">Please try again later </Typography>
          {isLoggedIn && (
            <>
              <Typography>&nbsp;or&nbsp;</Typography>
              <Button
                variant="text"
                color="green"
                size="md"
                onClick={() => navigate("/game/quiz/add")}
                className="px-1 py-1"
              >
                Create a new quiz
              </Button>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {headerContent}

      {quizList.map(({ id, title, image, description, timeLimit, difficulty }) => (
        <Card
          key={title}
          className="w-full max-w-[20rem] border border-gray-200 shadow-lg"
          onClick={() => navigate(`/game/quiz/${id}`)}
        >
          <CardHeader floated={false} color="blue-gray" className="items-ce nter flex justify-center pt-3">
            <img src={image} alt="the background for the quiz" className="h-40" />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            <div className="!absolute right-2 top-2">
              <AttemptBadge quizId={id} />
            </div>
          </CardHeader>
          <CardBody>
            <div className="mb-3 flex items-center justify-start">
              <Typography variant="h5" color="blue-gray" className="font-medium">
                {title}
              </Typography>
            </div>
            <Typography color="gray">{description}</Typography>
            <div className="mt-4 flex gap-3">
              <DifficultyChip difficulty={difficulty} />
              <TimeLimitChip timeLimit={timeLimit || 0} />
            </div>
          </CardBody>
          <CardFooter className="px-6 pb-4 pt-2">
            <Button size="md" color="blue" fullWidth={true} onClick={() => navigate(`/game/quiz/${id}`)}>
              Go to quiz
            </Button>
          </CardFooter>
        </Card>
      ))}

      {isLoggedIn && (
        <Button variant="gradient" color="green" size="md" onClick={() => navigate("/game/quiz/add")} className="my-10">
          Create a new quiz
        </Button>
      )}
    </>
  );
};
