import { Button, Card, Typography } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { CountryQuizzesQuery } from "@generated/graphql.ts";
import { CountryInfoModal } from "@pages/Game/CountryInfoModal.tsx";

interface CountryQuizListProps {
  countryDetails?: Country;
  quizList: CountryQuizzesQuery["quizList"];
  isLoadingCountryQuizList: boolean;
}

export const CountryQuizList = ({ countryDetails, quizList, isLoadingCountryQuizList }: CountryQuizListProps) => {
  if (!countryDetails) {
    return (
      <Typography variant="h3" className="mt-8 text-xl">
        👆 Get started and select a country on the map above 👆
      </Typography>
    );
  }

  const headerContent = (
    <div className="mb-4 mt-8 flex items-center gap-8 border-b-2 pb-4">
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
        {headerContent} <Loader2 size={60} className="mt-10 animate-spin" />
      </>
    );
  }

  if (quizList.length === 0) {
    return (
      <>
        {headerContent} <Typography className='mt-6'>No quizzes found for this country 🥹</Typography>
        <div className="flex items-center mt-4">
          <Typography>Please try again later or&nbsp;</Typography>
          <Button variant="text" className='px-1'>create your quiz</Button>
        </div>
      </>
    );
  }

  return (
    <>
      {headerContent}

      {quizList.map(({ title }) => (
        <Card key={title}>{title}</Card>
      ))}
    </>
  );
};
