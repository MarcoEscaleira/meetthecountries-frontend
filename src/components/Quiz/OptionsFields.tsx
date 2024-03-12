import { Checkbox, IconButton, Input, Tooltip, Typography } from "@material-tailwind/react";
import { Plus, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";
import { quizFormSchema } from "./quizFormSchema";

interface OptionsFieldsProps {
  questionIndex: number;
}

export function OptionsFields({ questionIndex }: OptionsFieldsProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<z.infer<typeof quizFormSchema>>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  return (
    <div className="mt-4 flex flex-col gap-3 px-3 py-2 md:px-5">
      <div className="flex items-center gap-3">
        <Typography className="font-medium">Options: {fields.length}</Typography>
        <Tooltip content={`Add an option for question ${questionIndex + 1}`} placement="top">
          <IconButton onClick={() => append({ text: "", correct: false })} color="green" size="sm">
            <Plus className="size-5" />
          </IconButton>
        </Tooltip>
      </div>

      <hr className="border-secondaryShades.5 w-full" />

      {fields.map((field, optionIndex) => (
        <div key={field.id} className="mb-4">
          <div className="flex items-center gap-2">
            <Typography>Option #{optionIndex + 1}</Typography>
            <Tooltip content="Remove option" placement="top">
              <IconButton onClick={() => remove(optionIndex)} variant="text" size="sm">
                <X className="size-4 stroke-red-500" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="flex items-center gap-3">
            <Input
              {...register(`questions.${questionIndex}.options.${optionIndex}.text`)}
              size="md"
              label="Text"
              placeholder=""
              error={!!errors.questions?.[questionIndex]?.options?.[optionIndex]?.text}
            />
            <Checkbox
              {...register(`questions.${questionIndex}.options.${optionIndex}.correct`)}
              color="green"
              label="Correct"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
