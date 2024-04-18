import { Input, InputProps } from "@material-tailwind/react";
import { FieldError, FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { ErrorText } from "./ErrorText";

interface FormInputProps extends Pick<InputProps, "size" | "label" | "placeholder" | "type"> {
  name: string;
  registerOptions?: RegisterOptions<FieldValues, string>;
  fieldError?: FieldError;
  dataCy?: string;
}

export const FormInput = ({ name, registerOptions, fieldError, dataCy, ...props }: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = fieldError?.message || errors?.[name]?.message?.toString() || "";

  return (
    <div className="w-full">
      <Input
        {...register(name, registerOptions)}
        size="lg"
        error={!!error}
        data-cy={dataCy || `input-${name}`}
        {...props}
      />
      {error && <ErrorText text={error} />}
    </div>
  );
};
