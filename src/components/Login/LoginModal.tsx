import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { useLocation } from "react-router-dom";
import { object, string } from "yup";
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
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const [loginMutation, { data, loading: isLoadingLogin, error: mutationError }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (window.location.hash.includes("login")) {
      setIsOpen(true);
      history.replaceState("", document.title, location.pathname + location.search);
    }
  }, [params]);

  useEffect(() => {
    if (data?.loginUser && !isLoadingLogin) {
      refetchUser();
    }
  }, [data, isLoadingLogin]);

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
          <XMarkIcon onClick={() => setIsOpen(false)} className="h-6 w-6 cursor-pointer sm:w-10" />
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
              id="email"
              className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="name@mail.com"
              {...register("email")}
            />
            {errors.email && <p className="text-sm text-red-500">Enter a valid email.</p>}
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
            {errors.password && <p className="text-sm text-red-500">Enter a password.</p>}
          </div>
          {mutationError?.message && <p className="text-sm text-red-500">{mutationError.message}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login to your account
          </button>
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
