import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Typography } from "@material-tailwind/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { gql } from "@generated/index.ts";

const LOGIN_USER = gql(/* GraphQL */ `
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      access_token
    }
  }
`);

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export function LoginForm({
  handleLoginSuccess,
  toggleDrawer,
}: {
  handleLoginSuccess: () => Promise<void>;
  toggleDrawer: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginMutation, { loading: isLoadingLogin, error: mutationError }] = useMutation(LOGIN_USER, {
    onCompleted: async data => {
      data.loginUser.access_token && (await handleLoginSuccess());
      toast.success("Logged in successfully!");
      reset();
    },
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 py-4">
        <Input
          {...register("email")}
          name="email"
          size="lg"
          label="Email address"
          placeholder="name@mail.com"
          error={!!errors.email}
        />

        <Input
          {...register("password")}
          name="password"
          size="lg"
          type="password"
          label="Password"
          placeholder="*******"
          error={!!errors.password}
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
    </div>
  );
}
