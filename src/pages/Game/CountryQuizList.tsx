import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CountryQuizzesQuery } from "@generated/graphql.ts";
import { CountryInfoModal } from "@pages/Game/CountryInfoModal.tsx";

interface CountryQuizListProps {
  countryDetails?: Country;
  quizList: CountryQuizzesQuery["quizList"];
  isLoadingCountryQuizList: boolean;
}

export const CountryQuizList = ({ countryDetails, quizList, isLoadingCountryQuizList }: CountryQuizListProps) => {
  const navigate = useNavigate();

  if (!countryDetails) {
    return (
      <Typography variant="h3" className="mt-8 text-xl">
        👆 Get started and select a country on the map above 👆
      </Typography>
    );
  }

  const headerContent = (
    <div className="mb-4 mt-8 flex items-center gap-8 border-b-2 px-2 pb-4 md:px-0">
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

      {quizList.map(({ id, title, image, description }) => (
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
          </CardBody>
          <CardFooter className="">
            <Button size="md" fullWidth={true} onClick={() => navigate(`/game/quiz/${id}`)}>
              Start
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
