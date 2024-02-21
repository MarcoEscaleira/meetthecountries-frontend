import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { QuizByIdQuery } from "@generated/graphql.ts";
import { router } from "@pages/router.tsx";
import { useUserStore } from "@state/userStore.ts";
import { apolloClient } from "@utils/apolloSetup.ts";
import { SUBMIT_ATTEMPT } from "@utils/queries/SubmitAttempt.ts";

type Questions = QuizByIdQuery["quizList"][0]["questions"];

interface AttemptState {
  isAttemptRunning: boolean;
  questions: Questions;
  currentQuestion: number;
  startTime: string;
  startAttempt: (questions: Questions, startTime: string) => void;
  submitAttempt: (quizId: string) => void;
  setQuestionResponse: (option: string) => void;
  resetAttempt: () => void;
  isStartQuizDialogOpen: boolean;
  toggleStartQuizDialog: () => void;
  quizAccordion: number;
  handleQuizAccordion: (value: number) => void;
}

export const useAttemptStore = create<AttemptState>()(
  devtools(
    (setState, getState) => ({
      isAttemptRunning: false,
      questions: [],
      currentQuestion: 0,
      startTime: "",
      startAttempt: (questions, startTime) =>
        setState(({ toggleStartQuizDialog, handleQuizAccordion }) => {
          toggleStartQuizDialog();
          handleQuizAccordion(0);

          const tempQuestions = [...questions];
          return {
            isAttemptRunning: true,
            questions: tempQuestions.sort(() => Math.random() - 0.5),
            currentQuestion: 0,
            startTime,
          };
        }),
      submitAttempt: async (quizId: string) => {
        const { questions, startTime } = getState();
        const endTime = new Date().toISOString();

        const { data } = await apolloClient.mutate({
          mutation: SUBMIT_ATTEMPT,
          variables: {
            attempt: { questions, startTime, endTime, quiz: quizId, user: useUserStore.getState().user.userId },
          },
        });

        if (data?.addAttempt?.id) {
          await router.navigate(`/game/quiz/${quizId}/attempt/${data.addAttempt.id}`);
          toast.success("Your quiz attempt has been submitted successfully.");

          getState().resetAttempt();
        } else {
          toast.error("Failed to submit the quiz attempt. Please try again.");
        }
      },
      setQuestionResponse: chosenOption => {
        const { questions, currentQuestion } = getState();

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

        return setState(() => ({
          questions: mappedQuestions,
          currentQuestion: currentQuestion + 1,
        }));
      },
      resetAttempt: () =>
        setState(() => ({
          isAttemptRunning: false,
          questions: [],
          currentQuestion: 0,
          startTime: "",
          quizAccordion: 1,
        })),
      isStartQuizDialogOpen: false,
      toggleStartQuizDialog: () =>
        setState(({ isStartQuizDialogOpen }) => ({ isStartQuizDialogOpen: !isStartQuizDialogOpen })),
      quizAccordion: 1,
      handleQuizAccordion: value =>
        setState(({ quizAccordion }) => ({ quizAccordion: quizAccordion === value ? 0 : value })),
    }),
    {
      name: "attempt-storage",
    }
  )
);
