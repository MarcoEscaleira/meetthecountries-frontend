import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography } from "@material-tailwind/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { FormInput } from "@components/Form";
import {
  LOGIN_USER,
  GET_USER_ATTEMPTS,
  GET_QUIZ_RATING,
  GET_COUNTRY_QUIZZES,
  GET_QUIZ_BY_ID,
  GET_QUIZ_ATTEMPTS,
} from "@utils/queries";

const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

export function LoginForm({ toggleDrawer }: { toggleDrawer: () => void }) {
  const revalidator = useRevalidator();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const [loginMutation, { loading: isLoadingLogin, error: mutationError }] = useMutation(LOGIN_USER, {
    onCompleted: async ({ loginUser }) => {
      loginUser.access_token && revalidator.revalidate();
      toast.success("Logged in successfully!");
      reset();
    },
    refetchQueries: [GET_COUNTRY_QUIZZES, GET_QUIZ_RATING, GET_USER_ATTEMPTS, GET_QUIZ_BY_ID, GET_QUIZ_ATTEMPTS],
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values, event) => {
    event?.preventDefault();
    try {
      await loginMutation({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  return (
    <div className="mt-8 w-full px-5">
      <div className="flex items-center rounded-t border-b pb-2">
        <Typography variant="h4" color="blue-gray">
          Sign in
        </Typography>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 py-4">
          <FormInput
            name="email"
            size="lg"
            label="Email address"
            placeholder="name@mail.com"
            fieldError={errors.email}
          />

          <FormInput
            name="password"
            size="lg"
            type="password"
            label="Password"
            placeholder="*******"
            fieldError={errors.password}
          />

          {mutationError?.message && (
            <Typography variant="small" color="red">
              {mutationError.message}
            </Typography>
          )}

          <Button type="submit" fullWidth disabled={isLoadingLogin} loading={isLoadingLogin}>
            Login to your account
          </Button>

          <div className="flex items-center">
            <Typography>Not registered?</Typography>&nbsp;
            <Link to="/register" onClick={toggleDrawer} className="text-blue-700 hover:underline">
              <Button size="sm" variant="text">
                Create an account
              </Button>
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
