import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { QuizByIdQuery } from "@generated/graphql.ts";

type Questions = QuizByIdQuery["quizList"][0]["questions"];

interface AttemptState {
  isAttemptRunning: boolean;
  questions: Questions;
  currentQuestion: number;
  startTime: string;
  endTime: string;
  startAttempt: (questions: Questions, startTime: string) => void;
  setQuestionResponse: (option: string) => void;
  resetAttempt: () => void;
  isStartQuizDialogOpen: boolean;
  toggleStartQuizDialog: () => void;
  quizAccordion: number;
  handleQuizAccordion: (value: number) => void;
}

export const useAttemptStore = create<AttemptState>()(
  devtools(
    set => ({
      isAttemptRunning: false,
      questions: [],
      currentQuestion: 0,
      startTime: "",
      endTime: "",
      startAttempt: (questions, startTime) =>
        set(({ toggleStartQuizDialog, handleQuizAccordion }) => {
          toggleStartQuizDialog();
          handleQuizAccordion(0);

          return {
            isAttemptRunning: true,
            questions: questions.sort(() => Math.random() - 0.5),
            currentQuestion: 0,
            startTime,
          };
        }),
      setQuestionResponse: option =>
        set(() => {
          console.log("update question response", option);
          return {};
        }),
      resetAttempt: () =>
        set(() => ({
          isAttemptRunning: false,
          questions: [],
          currentQuestion: 0,
          startTime: "",
          endTime: "",
          quizAccordion: 1,
        })),
      isStartQuizDialogOpen: false,
      toggleStartQuizDialog: () =>
        set(({ isStartQuizDialogOpen }) => ({ isStartQuizDialogOpen: !isStartQuizDialogOpen })),
      quizAccordion: 1,
      handleQuizAccordion: value =>
        set(({ quizAccordion }) => ({ quizAccordion: quizAccordion === value ? 0 : value })),
    }),
    {
      name: "attempt-storage",
    }
  )
);
