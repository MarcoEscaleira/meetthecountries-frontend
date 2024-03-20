import { z } from "zod";

export const quizCommentFormSchema = z.object({
  text: z.string().min(5, { message: "Enter a comment." }),
});
