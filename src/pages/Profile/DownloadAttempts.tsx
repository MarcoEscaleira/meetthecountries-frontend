import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Button, Typography } from "@material-tailwind/react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useUserStore } from "@state/userStore";
import { ALL_QUIZ_ATTEMPTS } from "@utils/queries/AllAttempts";

const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: "Quiz attempts", title: "Quiz Attempts" });

export const DownloadAttempts = () => {
  const {
    user: { userId },
  } = useUserStore();

  const { data, loading } = useQuery(ALL_QUIZ_ATTEMPTS, { variables: { userId } });
  const allAttempts = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data?.attempts.map(({ id, quiz, rating, ...others }) => ({
        quiz: quiz.title,
        ...others,
        quizTimeLimit: `${quiz.timeLimit} minutes`,
        questions: quiz.questions.map(({ question }) => question).join(" | "),
        ratingGiven: typeof rating === "number" ? rating : "Not rated",
      })) || [],
    [data]
  );

  return (
    <div className="mt-12 flex flex-col items-center">
      <Typography variant="h4">Download all your quiz attempts</Typography>
      <Button
        color="blue-gray"
        variant="gradient"
        className="mt-4"
        onClick={() => {
          try {
            const csv = generateCsv(csvConfig)(allAttempts);
            download(csvConfig)(csv);
          } catch (e) {}
        }}
        loading={loading}
        disabled={allAttempts.length === 0}
      >
        Download
      </Button>
    </div>
  );
};
