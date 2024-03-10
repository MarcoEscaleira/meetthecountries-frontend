import { Button, Card, CardBody, CardFooter, CardHeader, Spinner, Tooltip, Typography } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AttemptBadge } from "@components/AttemptBadge/AttemptBadge.tsx";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";
import { QuizRating } from "@components/QuizRating/QuizRating.tsx";
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
      <>
        <Typography variant="h2" className="mt-16 text-2xl font-bold">
          Begin by choosing a country
        </Typography>
        <img src="/images/world-hand.png" alt="World Hand" className="mt-4 size-2/4 sm:size-auto" />
      </>
    );
  }

  const headerContent = (
    <div className="mb-4 mt-12 flex w-full items-center justify-between gap-3 border-b-2 pb-4 sm:justify-center sm:gap-14 md:mt-10 md:px-0 md:pb-6">
      <Typography variant="h2" className="flex items-center gap-2 text-2xl">
        <img src={countryDetails.flags.svg} alt={countryDetails.name} className="h-5 w-5 rounded-full object-cover" />

        {countryDetails.name}
      </Typography>

      <div className="flex gap-4">
        <CountryInfoModal countryDetails={countryDetails} />

        {isLoggedIn && (
          <Tooltip content="Create a quiz">
            <Button
              variant="outlined"
              color="green"
              size="md"
              onClick={() => navigate("/game/quiz/add")}
              className="p-3"
            >
              <Plus />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );

  if (isLoadingCountryQuizList) {
    return (
      <>
        {headerContent} <Spinner className="mt-10 size-14" />
      </>
    );
  }

  if (quizList.length === 0) {
    return (
      <>
        {headerContent}
        <Typography className="mt-6 font-medium">
          Sorry, no quizzes available for {searchParams.get("country") || "this country"} at the moment.
        </Typography>
        {isLoggedIn && (
          <Button variant="text" color="green" size="md" onClick={() => navigate("/game/quiz/add")} className="mt-4">
            Create a quiz
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      {headerContent}

      <div className="flex w-full flex-wrap justify-center gap-8">
        {quizList.map(({ id, title, image, description, timeLimit, difficulty }) => (
          <Card
            key={title}
            className="w-full max-w-[20rem] border border-gray-200 shadow-lg"
            onClick={() => navigate(`/game/quiz/${id}`)}
          >
            <CardHeader floated={false} color="blue-gray" className="items-ce nter flex justify-center pt-3">
              <img src={image} alt="the background for the quiz" className="h-40" />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              <div className="!absolute bottom-2 left-2">
                <QuizRating quizId={id} />
              </div>
              <div className="!absolute right-2 top-2">
                <AttemptBadge quizId={id} />
              </div>
            </CardHeader>
            <CardBody className="flex-grow">
              <div className="mb-3 flex items-center justify-start">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                  {title}
                </Typography>
              </div>
              <Typography color="gray" className="break-words">
                {description}
              </Typography>
              <div className="mt-4 flex flex-wrap gap-3">
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
      </div>
    </>
  );
};
