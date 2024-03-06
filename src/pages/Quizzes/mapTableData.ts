import { Difficulty, QuizzesQuery } from "@generated/graphql.ts";

export interface QuizListData {
  id: string;
  title: string;
  status: string;
  difficulty: string;
  country: string;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}

export const mapQuizList = (quizzes: Array<QuizzesQuery["quizList"][0]>): QuizListData[] => {
  return quizzes.map(quizzes => ({
    id: quizzes.id || "",
    title: quizzes.title || "",
    status: quizzes.status || "",
    difficulty: quizzes.difficulty || Difficulty.Unknown,
    country: quizzes.country || "",
    creator: `${quizzes.creator.firstName} ${quizzes.creator.lastName}`,
    createdAt: new Date(quizzes.createdAt),
    updatedAt: new Date(quizzes.updatedAt),
  }));
};
