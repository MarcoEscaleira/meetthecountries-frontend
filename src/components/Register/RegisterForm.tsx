import { cloneElement } from "react";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Typography, Button, Select, Option } from "@material-tailwind/react";
import { Info } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCountries } from "use-react-countries";
import { z } from "zod";
import { DatePicker } from "@components/DatePicker/DatePicker.tsx";
import { gql } from "@generated/gql.ts";

const REGISTER_USER = gql(/* GraphQL */ `
  mutation SignupUser($user: SignUpInput!) {
    signupUser(user: $user) {
      id
    }
  }
`);

const formSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email." }),
    password: z.string().min(1, { message: "Enter a password." }),
    passwordConfirm: z.string().min(1, { message: "Enter a confirm password." }),
    firstName: z.string().min(1, { message: "Enter a first name." }),
    lastName: z.string(),
    dateOfBirth: z.date(),
    country: z.string(),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirm"],
      });
    }
  });

export function RegisterForm() {
  const navigate = useNavigate();
  const { countries } = useCountries();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      country: "",
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const [registerMutation, { loading: isLoadingRegister, error: mutationError }] = useMutation(REGISTER_USER, {
    onCompleted: async () => {
      toast.success("Registered successfully!");
      navigate("/");
      reset();
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values, event) => {
    event?.preventDefault();
    try {
      await registerMutation({
        variables: {
          user: {
            ...values,
            dateOfBirth: values.dateOfBirth.toISOString(),
          },
        },
      });
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
        <Input
          {...register("email")}
          name="email"
          size="lg"
          label="Email address"
          placeholder="name@mail.com"
          error={!!errors.email}
        />

        <div>
          <div className="flex space-x-4">
            <Input
              {...register("password")}
              name="password"
              size="lg"
              type="password"
              label="Password"
              placeholder="*******"
              error={!!errors.password}
            />
            <Input
              {...register("passwordConfirm")}
              name="passwordConfirm"
              size="lg"
              type="password"
              label="Password confirmation"
              placeholder="*******"
              error={!!errors.passwordConfirm}
            />
          </div>

          <Typography variant="small" color="gray" className="mt-2 flex items-center gap-1 font-normal">
            <Info className="w-7 md:w-5" />
            Use at least 8 characters, one uppercase, one lowercase and one number and one special character.
          </Typography>
        </div>

        <Input
          {...register("firstName")}
          name="firstName"
          size="lg"
          label="First name"
          placeholder=""
          error={!!errors.firstName}
        />

        <Input
          {...register("lastName")}
          name="lastName"
          size="lg"
          label="Last name"
          placeholder=""
          error={!!errors.lastName}
        />

        <DatePicker
          name="dateOfBirth"
          label="Date of birth"
          disabled={{ after: new Date() }}
          error={!!errors.dateOfBirth}
        />

        <Select
          size="lg"
          label="Select Country"
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

        {mutationError?.message && (
          <Typography variant="small" color="red">
            {mutationError.message}
          </Typography>
        )}

        <Button type="submit" fullWidth disabled={isLoadingRegister} loading={isLoadingRegister}>
          Create
        </Button>
      </form>
    </FormProvider>
  );
}
