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
  });
