import { z } from "zod";
import { Difficulty, QuestionType } from "@generated/graphql.ts";

export const quizFormSchema = z
  .object({
    title: z.string().min(5, { message: "Enter a title." }),
    description: z.string().min(50, { message: "Enter a description." }),
    country: z.string().min(1, { message: "Enter a country." }),
    image: z.union([z.literal(""), z.string().trim().url()]),
    questions: z.array(
      z.object({
        question: z.string().min(15, { message: "Enter a question." }),
        type: z.nativeEnum(QuestionType),
        options: z.array(
          z.object({
            text: z.string().min(1, { message: "Enter an option." }),
            correct: z.boolean(),
          })
        ),
        image: z.string().optional(),
      })
    ),
    difficulty: z.nativeEnum(Difficulty),
    timeLimit: z.number().nonnegative().optional(),
    tags: z.string().array().optional(),
  })
  .superRefine(({ questions }, ctx) => {
    const hasAllQuestionsHaveAtLeastOneCorrectOption = questions.every(question => {
      return question.options.some(option => option.correct);
    });

    if (!hasAllQuestionsHaveAtLeastOneCorrectOption) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Each question must at least have one correct option.",
        path: ["correctOption"],
      });
    }

    // if question is multi choice type, then it must have at least 2 correct options
    const hasAllMultiChoiceQuestionsHaveAtLeastTwoCorrectOptions = questions.every(question => {
      if (question.type === QuestionType.Multi) {
        const correctOptions = question.options.filter(option => option.correct);
        return correctOptions.length >= 2;
      }
      return true;
    });

    if (!hasAllMultiChoiceQuestionsHaveAtLeastTwoCorrectOptions) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Multi choice question must at least have two correct options.",
        path: ["correctOption"],
      });
    }

    // Question cannot have all options as correct
    const hasAllQuestionsHaveNotAllOptionsCorrect = questions.every(question => {
      const correctOptions = question.options.filter(option => option.correct);
      return correctOptions.length !== question.options.length;
    });

    if (!hasAllQuestionsHaveNotAllOptionsCorrect) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A question cannot have all options as correct.",
        path: ["correctOption"],
      });
    }
  });
