import { cloneElement } from "react";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCountries } from "use-react-countries";
import { z } from "zod";
import { Difficulty, Roles } from "@generated/graphql.ts";
import { useUserStore } from "@state/userStore.ts";
import { CREATE_QUIZ } from "@utils/queries/CreateQuiz.ts";
import { DifficultyChip } from "@components/DifficultyChip/DifficultyChip.tsx";

const formSchema = z.object({
  title: z.string().min(5, { message: "Enter a title." }),
  description: z.string().min(50, { message: "Enter a description." }),
  country: z.string().min(1, { message: "Enter a country." }),
  image: z.string().url({ message: "Enter a valid URL." }),
  // questions: z.array()
  difficulty: z.string(),
  // difficulty: z.enum(Difficulty),
  timeLimit: z.number(),
  // tags: z.array()
});
export function QuizForm() {
  const navigate = useNavigate();
  const { countries } = useCountries();

  const {
    user: { role },
  } = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      country: "",
      image: "",
      // questions: [],
      difficulty: Difficulty.Unknown,
      timeLimit: 0,
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  console.log(errors);

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

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values, event) => {
    event?.preventDefault();
    try {
      await createQuizMutation({
        variables: {
          quiz: {
            ...values,
            questions: [],
            tags: [],
          },
        },
      });
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        <div className="flex items-center gap-3">
          <Select
            size="lg"
            label="Difficulty"
            onChange={value => form.setValue("difficulty", value || Difficulty.Unknown)}
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
                <DifficultyChip difficulty={Difficulty[difficulty]} />
              </Option>
            ))}
          </Select>

          <Input
            {...register("timeLimit")}
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

        <Button type="submit" fullWidth disabled={isLoadingQuizCreation} loading={isLoadingQuizCreation}>
          Create Quiz
        </Button>
      </form>
    </FormProvider>
  );
}
