import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Typography } from "@material-tailwind/react";
import { X } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { Link, useLocation } from "react-router-dom";
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

export function LoginModal({ refetchUser }: { refetchUser: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useLocation();

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
    onCompleted: data => {
      data.loginUser.access_token && refetchUser();
      toast.success("Logged in successfully!");
      setIsOpen(false);
      reset();
    },
  });

  useEffect(() => {
    if (window.location.hash.includes("login")) {
      setIsOpen(true);
      history.replaceState("", document.title, location.pathname + location.search);
    }
  }, [params]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values, event) => {
    event?.preventDefault();

    console.log(values);

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
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc
      className="modal-popup"
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick
    >
      <div className="w-full rounded-lg bg-white p-4 shadow">
        <div className="flex w-96 items-center justify-between rounded-t border-b pb-4 md:pb-4">
          <Typography variant="h3" color="blue-gray">
            Sign in
          </Typography>
          <X onClick={() => setIsOpen(false)} className="h-6 w-6 cursor-pointer sm:w-10" />
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

          {mutationError?.message && <p className="text-sm text-red-500">{mutationError.message}</p>}

          <Button type="submit" disabled={isLoadingLogin} loading={isLoadingLogin}>
            Login to your account
          </Button>

          <div className="text-sm font-medium text-gray-500">
            Not registered?&nbsp;
            <Link to="/register" className="text-blue-700 hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
