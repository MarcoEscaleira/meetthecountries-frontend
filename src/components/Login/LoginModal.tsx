import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button.tsx";
import { gql } from "@generated/index.ts";

const LOGIN_USER = gql(/* GraphQL */ `
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      access_token
    }
  }
`);

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(1, { message: "Enter a password." }),
});

export function LoginModal({ refetchUser }: { refetchUser: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
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
      form.reset();
    },
  });

  useEffect(() => {
    if (window.location.hash.includes("login")) {
      setIsOpen(true);
      history.replaceState("", document.title, location.pathname + location.search);
    }
  }, [params]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
        <div className="flex w-96 items-center justify-between rounded-t border-b p-4 md:p-5">
          <h3 className="text-xl font-semibold text-gray-900">Sign in</h3>
          <X onClick={() => setIsOpen(false)} className="h-6 w-6 cursor-pointer sm:w-10" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="name@mail.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Your password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>Make sure to always keep your password safe.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mutationError?.message && <p className="text-sm text-red-500">{mutationError.message}</p>}

            <Button type="submit" disabled={isLoadingLogin}>
              {isLoadingLogin && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login to your account
            </Button>

            <div className="text-sm font-medium text-gray-500">
              Not registered?&nbsp;
              <a href="#" className="text-blue-700 hover:underline">
                Create an account
              </a>
            </div>
          </form>
        </Form>
      </div>
    </ReactModal>
  );
}
