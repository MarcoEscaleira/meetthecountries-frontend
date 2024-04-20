import { Button, Spinner, Tooltip, Typography } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CountryQuizzesQuery, Difficulty } from "@generated/graphql.ts";
import { CountryInfoModal } from "@pages/Game/CountryInfoModal.tsx";
import { useUserStore } from "@state/userStore.ts";
import { useCountryDetails } from "@utils/hooks/useCountryDetails.ts";
import { CountryQuizCard } from "./CountryQuizCard";

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

  const goToQuizForm = () => navigate(`/game/quiz/add?country=${countryDetails.name}`);

  const headerContent = (
    <div className="mb-4 mt-20 flex w-full items-center justify-between gap-3 border-b-2 pb-4 sm:justify-center sm:gap-14 md:mt-10 md:px-0 md:pb-6">
      <Typography variant="h2" className="flex items-center gap-2 text-2xl">
        <img src={countryDetails.flags.svg} alt={countryDetails.name} className="h-5 w-5 rounded-full object-cover" />

        {countryDetails.name}
      </Typography>

      <div className="flex gap-4">
        <CountryInfoModal countryDetails={countryDetails} />

        {isLoggedIn && (
          <Tooltip content="Create a quiz">
            <Button variant="outlined" color="black" size="md" onClick={goToQuizForm} className="p-3">
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
          <Button variant="text" color="green" size="md" onClick={goToQuizForm} className="mt-4 mb-16">
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
          <CountryQuizCard
            key={id}
            id={id}
            title={title}
            image={image}
            description={description}
            timeLimit={timeLimit || 0}
            difficulty={difficulty || Difficulty.Unknown}
          />
        ))}
      </div>
    </>
  );
};
