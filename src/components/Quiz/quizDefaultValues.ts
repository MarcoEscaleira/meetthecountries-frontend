import { Difficulty, QuestionType, QuizByIdQuery } from "@generated/graphql";

export const getQuizFormDefaultValues = (searchParams: URLSearchParams, quiz?: QuizByIdQuery["quizById"]) => ({
  title: quiz?.title || "",
  description: quiz?.description || "",
  country: quiz?.country || searchParams.get("country") || "",
  image: quiz?.image || "",
  questions: quiz?.questions || [
    {
      question: "",
      type: QuestionType.Single,
      options: [
        { text: "", correct: false },
        { text: "", correct: false },
      ],
    },
  ],
  difficulty: quiz?.difficulty || Difficulty.Unknown,
  timeLimit: quiz?.timeLimit || 0,
  tags: quiz?.tags || [],
});
