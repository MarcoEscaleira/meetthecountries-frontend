import { cloneElement, useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Option, Select, Textarea } from "@material-tailwind/react";
import { Loader2 } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCountries } from "use-react-countries";
import { z } from "zod";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";
import { ErrorText, FormInput } from "@components/Form";
import { QuestionFields } from "@components/Quiz/QuestionsFields.tsx";
import { quizFormSchema } from "@components/Quiz/quizFormSchema.ts";
import { TagsInput } from "@components/TagsInput/TagsInput.tsx";
import { Difficulty, Roles } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";
import {
  GET_COUNTRY_QUIZZES,
  CREATE_QUIZ,
  GET_QUIZ_BY_ID,
  GET_QUIZZES,
  UPDATE_QUIZ,
  GET_USER_ATTEMPTS,
} from "@utils/queries";
import { getQuizFormDefaultValues } from "./quizDefaultValues";

export function QuizForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { countries } = useCountries();
  const orderedCountries = useCallback(() => {
    return countries.sort((a, b) => (a.name < b.name ? -1 : 1));
  }, [countries]);

  const { quizId } = useParams();

  const { data, loading } = useQuery(GET_QUIZ_BY_ID, { variables: { quizId: quizId || "" } });
  const quiz = data?.quizById;

  const {
    user: { role },
  } = useUserStore();

  const form = useForm<z.infer<typeof quizFormSchema>>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: getQuizFormDefaultValues(searchParams, quiz),
  });
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (quizId && quiz) {
      reset(getQuizFormDefaultValues(searchParams, quiz));
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
        navigate(`/game?country=${getValues("country")}`);
        reset();
      },
      refetchQueries: [GET_QUIZZES, GET_COUNTRY_QUIZZES, GET_USER_ATTEMPTS],
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
      navigate(-1);
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  if (loading)
    return (
      <div className="flex w-full items-center justify-center">
        <Loader2 size={42} className="animate-spin" />
      </div>
    );

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput name="title" label="Title" placeholder="A great quiz title" />

        <div>
          <Textarea
            {...register("description")}
            size="lg"
            label="Description"
            placeholder=""
            error={!!errors.description}
          />
          <ErrorText text={errors.description?.message || ""} className="mt-0" />
        </div>

        <Select
          size="lg"
          label="Country"
          value={getValues("country")}
          onChange={value => form.setValue("country", value || "")}
          selected={element =>
            element &&
            cloneElement(element, {
              disabled: true,
              className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
            })
          }
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          error={!!errors.country}
        >
          {orderedCountries().map(({ name, flags }) => (
            <Option key={name} value={name} className="flex items-center gap-2">
              <img src={flags.svg} alt={name} className="h-5 w-5 rounded-full object-cover" />
              {name}
            </Option>
          ))}
        </Select>

        <FormInput name="image" label="Image URL" />

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

          <FormInput
            name="timeLimit"
            registerOptions={{ valueAsNumber: true, validate: value => value! > 0 }}
            label="Time limit (minutes, 0 means no limit)"
            type="number"
          />
        </div>

        <TagsInput name="tags" label="Tags" />

        {(mutationCreateError?.message || mutationUpdateError?.message) && (
          <ErrorText text={mutationCreateError?.message || mutationUpdateError?.message || ""} />
        )}

        {/* @ts-expect-error: not sure how to grab this type from Zod superRefine */}
        {errors?.correctOption && <ErrorText text={errors.correctOption.message} />}

        <Button
          type="submit"
          fullWidth
          disabled={isLoadingQuizCreation || isLoadingQuizUpdate}
          loading={isLoadingQuizCreation || isLoadingQuizUpdate}
          className="mb-8 mt-4"
        >
          {quizId ? "Update Quiz" : "Create Quiz"}
        </Button>
      </form>
    </FormProvider>
  );
}
