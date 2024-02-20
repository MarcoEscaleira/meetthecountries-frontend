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

          // TODO: sort questions and options on attempt start
          return {
            isAttemptRunning: true,
            questions: questions,
            currentQuestion: 0,
            startTime,
          };
        }),
      setQuestionResponse: chosenOption =>
        set(({ questions, currentQuestion }) => {
          const mappedQuestions = questions.map((question, index) => {
            if (index === currentQuestion) {
              // Update the option chosen
              return {
                ...question,
                options: question.options.map(option => {
                  if (option.text === chosenOption) {
                    return {
                      ...option,
                      chosen: true,
                    };
                  }
                  return option;
                }),
              };
            }

            return question;
          });

          return {
            questions: mappedQuestions,
            currentQuestion: currentQuestion + 1,
          };
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
