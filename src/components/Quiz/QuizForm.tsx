import { cloneElement } from "react";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCountries } from "use-react-countries";
import { z } from "zod";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";
import { QuestionFields } from "@components/Quiz/QuestionsFields.tsx";
import { quizFormSchema } from "@components/Quiz/quizFormSchema.ts";
import { Difficulty, QuestionType, Roles } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";
import { CREATE_QUIZ } from "@utils/queries/CreateQuiz.ts";

export function QuizForm() {
  const navigate = useNavigate();
  const { countries } = useCountries();

  const {
    user: { role },
  } = useUserStore();

  const form = useForm<z.infer<typeof quizFormSchema>>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: "",
      description: "",
      country: "",
      image: "",
      questions: [{ question: "", type: QuestionType.Single, options: [{ text: "", correct: false }] }],
      difficulty: Difficulty.Unknown,
      timeLimit: 0,
      tags: [],
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = form;

  const [createQuizMutation, { loading: isLoadingQuizCreation, error: mutationError }] = useMutation(CREATE_QUIZ, {
    onCompleted: async () => {
      toast.success(
        role === Roles.Admin
          ? "Quiz created successfully!"
          : "Quiz created successfully. An admin will review it promptly!"
      );
      navigate("/");
      reset();
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof quizFormSchema>> = async (values, event) => {
    event?.preventDefault();
    try {
      await createQuizMutation({
        variables: {
          quiz: {
            ...values,
          },
        },
      });
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 overflow-y-auto">
        <Input {...register("title")} size="lg" label="Title" placeholder="A great quiz title" error={!!errors.title} />

        <Textarea
          {...register("description")}
          size="lg"
          label="Description"
          placeholder=""
          error={!!errors.description}
        />

        <Select
          size="lg"
          label="Country"
          onChange={value => form.setValue("country", value || "")}
          selected={element =>
            element &&
            cloneElement(element, {
              disabled: true,
              className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
            })
          }
          error={!!errors.country}
        >
          {countries.map(({ name, flags }) => (
            <Option key={name} value={name} className="flex items-center gap-2">
              <img src={flags.svg} alt={name} className="h-5 w-5 rounded-full object-cover" />
              {name}
            </Option>
          ))}
        </Select>

        <Input {...register("image")} size="lg" label="Image URL" placeholder="" error={!!errors.image} />

        <QuestionFields />

        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-3">
          <Select
            size="lg"
            label="Difficulty"
            value={getValues("difficulty")}
            onChange={value => form.setValue("difficulty", (value as Difficulty) || Difficulty.Unknown)}
            selected={element =>
              element &&
              cloneElement(element, {
                disabled: true,
                className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
              })
            }
            error={!!errors.difficulty}
          >
            {Object.keys(Difficulty).map(difficulty => (
              <Option key={difficulty} value={difficulty} className="flex items-center gap-2">
                <DifficultyChip difficulty={Difficulty[difficulty]} size="sm" />
              </Option>
            ))}
          </Select>

          <Input
            {...register("timeLimit", { valueAsNumber: true, validate: value => value! > 0 })}
            size="lg"
            label="Time limit (minutes, 0 means no limit)"
            error={!!errors.timeLimit}
            type="number"
          />
        </div>

        {mutationError?.message && (
          <Typography variant="small" color="red">
            {mutationError.message}
          </Typography>
        )}

        {/* @ts-expect-error: not sure how to grab this type from Zod superRefine */}
        {errors?.correctOption && (
          <Typography variant="small" color="red">
            {/* @ts-expect-error: not sure how to grab this type from Zod superRefine */}
            {errors.correctOption.message}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          disabled={isLoadingQuizCreation}
          loading={isLoadingQuizCreation}
          className="mt-4"
        >
          Create Quiz
        </Button>
      </form>
    </FormProvider>
  );
}
