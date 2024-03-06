import { cloneElement, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCountries } from "use-react-countries";
import { z } from "zod";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";
import { QuestionFields } from "@components/Quiz/QuestionsFields.tsx";
import { quizFormSchema } from "@components/Quiz/quizFormSchema.ts";
import { TagsInput } from "@components/TagsInput/TagsInput.tsx";
import { Difficulty, QuestionType, QuizByIdQuery, Roles } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";
import { CREATE_QUIZ } from "@utils/queries/CreateQuiz.ts";
import { GET_QUIZ_BY_ID } from "@utils/queries/QuizById.ts";
import { UPDATE_QUIZ } from "@utils/queries/UpdateQuiz.ts";

const getDefaultValues = (quiz?: QuizByIdQuery["quizById"]) => ({
  title: quiz?.title || "",
  description: quiz?.description || "",
  country: quiz?.country || "",
  image: quiz?.image || "",
  questions: quiz?.questions || [{ question: "", type: QuestionType.Single, options: [{ text: "", correct: false }] }],
  difficulty: quiz?.difficulty || Difficulty.Unknown,
  timeLimit: quiz?.timeLimit || 0,
  tags: quiz?.tags || [],
});

export function QuizForm() {
  const navigate = useNavigate();
  const { countries } = useCountries();

  const { quizId } = useParams();

  const [fetchQuiz, { data, loading }] = useLazyQuery(GET_QUIZ_BY_ID, { variables: { quizId: quizId || "" } });
  const quiz = data?.quizById;

  const {
    user: { role },
  } = useUserStore();

  useEffect(() => {
    if (quizId && !loading) fetchQuiz();
  }, [quizId]);

  const form = useForm<z.infer<typeof quizFormSchema>>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: getDefaultValues(quiz),
  });
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = form;

  useEffect(() => {
    if (quizId && quiz) {
      reset(getDefaultValues(quiz));
    }
  }, [quizId, quiz]);

  const [createQuizMutation, { loading: isLoadingQuizCreation, error: mutationCreateError }] = useMutation(
    CREATE_QUIZ,
    {
      onCompleted: async () => {
        toast.success(
          role === Roles.Admin
            ? "Quiz created successfully!"
            : "Quiz created successfully. An admin will review it promptly!"
        );
        navigate("/");
        reset();
      },
    }
  );

  const [updateQuizMutation, { loading: isLoadingQuizUpdate, error: mutationUpdateError }] = useMutation(UPDATE_QUIZ, {
    onCompleted: async () => {
      toast.success("Quiz updated successfully!");
    },
    refetchQueries: [GET_QUIZ_BY_ID],
  });

  const onSubmit: SubmitHandler<z.infer<typeof quizFormSchema>> = async (values, event) => {
    event?.preventDefault();
    try {
      if (quizId) {
        await updateQuizMutation({
          variables: {
            quizId,
            quiz: values,
          },
        });
      } else {
        await createQuizMutation({
          variables: {
            quiz: values,
          },
        });
      }
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

        <TagsInput name="tags" label="Tags" />

        {(mutationCreateError?.message || mutationUpdateError?.message) && (
          <Typography variant="small" color="red">
            {mutationCreateError?.message}
            {mutationUpdateError?.message}
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
          disabled={isLoadingQuizCreation || isLoadingQuizUpdate || !isDirty || Object.keys(errors).length > 0}
          loading={isLoadingQuizCreation || isLoadingQuizUpdate}
          className="mt-4"
        >
          Create Quiz
        </Button>
      </form>
    </FormProvider>
  );
}
