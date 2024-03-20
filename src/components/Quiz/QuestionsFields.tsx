import { cloneElement } from "react";
import { IconButton, Option, Select, Tooltip, Typography } from "@material-tailwind/react";
import { Plus, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "@components/Form";
import { QuestionTypeChip } from "@components/QuestionTypeChip/QuestionTypeChip.tsx";
import { QuestionType } from "@generated/graphql.ts";
import { OptionsFields } from "./OptionsFields";
import { quizFormSchema } from "./quizFormSchema";

export function QuestionFields() {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<z.infer<typeof quizFormSchema>>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <div className="mt-4">
      <div className="mb-1 flex items-center gap-3">
        <Typography className="font-medium">Questions: {fields.length}</Typography>
        <Tooltip content="Add a question" placement="top">
          <IconButton
            onClick={() => append({ question: "", type: QuestionType.Single, options: [{ text: "", correct: false }] })}
            color="green"
            size="sm"
          >
            <Plus className="size-5" />
          </IconButton>
        </Tooltip>
      </div>

      <hr className="border-secondaryShades.5 mt-2 w-full" />

      {fields.map((field, questionIndex) => (
        <div key={field.id} className="mt-3 flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <Typography>Question #{questionIndex + 1}</Typography>
            <IconButton onClick={() => remove(questionIndex)} variant="text" size="sm">
              <X className="size-5 stroke-red-500" />
            </IconButton>
          </div>

          <div className="mb-2">
            <FormInput
              name={`questions.${questionIndex}.question`}
              size="md"
              label="Title"
              fieldError={errors.questions?.[questionIndex]?.question}
            />
          </div>

          <div className="mb-2">
            <FormInput
              name={`questions.${questionIndex}.image`}
              size="md"
              label="Image"
              fieldError={errors.questions?.[questionIndex]?.image}
            />
          </div>

          <Select
            label="Type"
            value={getValues(`questions.${questionIndex}.type`)}
            onChange={value =>
              setValue(`questions.${questionIndex}.type`, (value as QuestionType) || QuestionType.Single)
            }
            selected={element =>
              element &&
              cloneElement(element, {
                disabled: true,
                className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
              })
            }
          >
            {Object.keys(QuestionType).map(type => (
              <Option key={`questions-${questionIndex}-${type}`} value={type} className="flex items-center gap-2">
                <QuestionTypeChip questionType={QuestionType[type]} />
              </Option>
            ))}
          </Select>

          <OptionsFields questionIndex={questionIndex} />
        </div>
      ))}
    </div>
  );
}
