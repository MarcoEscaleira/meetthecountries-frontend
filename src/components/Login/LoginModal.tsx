import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { Button } from "@components/ui/button.tsx";
import { gql } from "@generated/index.ts";

const LOGIN_USER = gql(/* GraphQL */ `
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      access_token
    }
  }
`);

const schema = object().shape({
  email: string().email().required(),
  password: string().required().min(4),
});

export function LoginModal({ refetchUser }: { refetchUser: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
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

  const loginFormSubmit = handleSubmit(async data => {
    try {
      await loginMutation({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });
    } catch (e) {
      console.log("Something went wrong", e);
    }
  });

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc
      className="modal-popup"
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick
    >
      <div className="w-full rounded-lg bg-white p-4 shadow">
        <div className="flex w-96 items-center justify-between rounded-t border-b p-4 md:p-5">
          <h3 className="text-xl font-semibold text-gray-900">Sign in</h3>
          <X onClick={() => setIsOpen(false)} className="h-6 w-6 cursor-pointer sm:w-10" />
        </div>

        <form className="space-y-4 p-4 md:p-5" onSubmit={loginFormSubmit}>
          <div>
            <label
              htmlFor="email"
              className={`mb-2 block text-sm font-medium ${errors.email ? "text-red-400" : "text-gray-900"}`}
            >
              Your email
            </label>
            <input
              type="email"
              className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="name@mail.com"
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">Enter a valid email.</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className={`mb-2 block text-sm font-medium ${errors.password ? "text-red-400" : "text-gray-900"}`}
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              {...register("password")}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">Enter a password.</p>}
          </div>

          {mutationError?.message && <p className="text-sm text-red-500">{mutationError.message}</p>}

          <Button type="submit" disabled={isLoadingLogin}>
            {isLoadingLogin && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login to your account
          </Button>
          <div className="text-sm font-medium text-gray-500">
            Not registered?{" "}
            <a href="#" className="text-blue-700 hover:underline">
              Create account
            </a>
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
