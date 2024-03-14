import { Input, InputProps } from "@material-tailwind/react";
import { FieldError, FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { ErrorText } from "./ErrorText";

interface FormInputProps extends Pick<InputProps, "size" | "label" | "placeholder" | "type"> {
  name: string;
  registerOptions?: RegisterOptions<FieldValues, string>;
  fieldError?: FieldError;
}

export const FormInput = ({ name, registerOptions, fieldError, ...props }: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = fieldError?.message || errors?.[name]?.message?.toString() || "";

  return (
    <div className="w-full">
      <Input {...register(name, registerOptions)} size="lg" error={!!error} {...props} />
      {error && <ErrorText text={error} />}
    </div>
  );
};
