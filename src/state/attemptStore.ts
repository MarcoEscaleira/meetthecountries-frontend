import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { QuestionType, QuizByIdQuery } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";
import { apolloClient } from "@utils/apolloSetup.ts";
import { GET_QUIZ_ATTEMPTS } from "@utils/queries/QuizAttempts.ts";
import { SUBMIT_ATTEMPT } from "@utils/queries/SubmitAttempt.ts";

type Questions = QuizByIdQuery["quizById"]["questions"];

interface AttemptState {
  isAttemptRunning: boolean;
  questions: Questions;
  currentQuestion: number;
  startTime: string;
  startAttempt: (questions: Questions, startTime: string) => void;
  submitAttempt: (quizId: string, navigate: NavigateFunction) => void;
  setQuestionResponse: (option: string) => void;
  resetAttempt: () => void;
  isCancelQuizDialogOpen: boolean;
  toggleCancelQuizDialog: () => void;
  quizAccordion: number;
  handleQuizAccordion: (value: number) => void;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
}

export const useAttemptStore = create<AttemptState>()(
  devtools(
    (setState, getState) => ({
      isAttemptRunning: false,
      questions: [],
      currentQuestion: 0,
      startTime: "",
      isCancelQuizDialogOpen: false,
      quizAccordion: 1,

      startAttempt: (questions, startTime) =>
        setState(({ handleQuizAccordion }) => {
          handleQuizAccordion(0);

          const tempQuestions = [...questions];
          return {
            isAttemptRunning: true,
            questions: tempQuestions.sort(() => Math.random() - 0.5),
            currentQuestion: 0,
            startTime,
          };
        }),

      submitAttempt: async (quizId, navigate) => {
        const { questions, startTime } = getState();
        const endTime = new Date().toISOString();

        const { data } = await apolloClient.mutate({
          mutation: SUBMIT_ATTEMPT,
          variables: {
            attempt: { questions, startTime, endTime, quiz: quizId, user: useUserStore.getState().user.userId },
          },
          refetchQueries: [GET_QUIZ_ATTEMPTS],
        });

        if (data?.addAttempt?.id) {
          navigate(`/game/quiz/${quizId}/attempt/${data.addAttempt.id}`);
          toast.success("Your quiz attempt has been submitted successfully.");

          getState().resetAttempt();
        } else {
          toast.error("Failed to submit the quiz attempt. Please try again.");
        }
      },

      setQuestionResponse: chosenOption => {
        const { questions, currentQuestion } = getState();

        const isSingleChoice = questions[currentQuestion].type === QuestionType.Single;
        const isMultipleChoice = questions[currentQuestion].type === QuestionType.Multi;

        const mappedQuestions = questions.map((question, index) => {
          if (index === currentQuestion) {
            if (isSingleChoice) {
              return {
                ...question,
                options: question.options.map(option => {
                  const chosen = option.text === chosenOption;
                  return {
                    ...option,
                    chosen: chosen,
                  };
                }),
              };
            }

            if (isMultipleChoice) {
              return {
                ...question,
                options: question.options.map(option => {
                  const chosen = option.text === chosenOption;
                  return {
                    ...option,
                    chosen: chosen ? !option.chosen : option.chosen,
                  };
                }),
              };
            }
          }

          return question;
        });

        return setState(() => ({
          questions: mappedQuestions,
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

      toggleCancelQuizDialog: () =>
        setState(({ isCancelQuizDialogOpen }) => ({ isCancelQuizDialogOpen: !isCancelQuizDialogOpen })),

      handleQuizAccordion: value =>
        setState(({ quizAccordion }) => ({ quizAccordion: quizAccordion === value ? 0 : value })),

      goToPreviousQuestion: () => {
        const { currentQuestion } = getState();
        if (currentQuestion > 0) {
          return setState(() => ({ currentQuestion: currentQuestion - 1 }));
        }
      },

      goToNextQuestion: () => {
        const { currentQuestion, questions } = getState();
        if (currentQuestion < questions.length - 1) {
          return setState(() => ({ currentQuestion: currentQuestion + 1 }));
        }
      },
    }),
    {
      name: "attempt-storage",
    }
  )
);
