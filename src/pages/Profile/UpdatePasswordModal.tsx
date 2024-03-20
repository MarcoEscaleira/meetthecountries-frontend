import { useState } from "react";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogBody, DialogHeader, Typography } from "@material-tailwind/react";
import { Info } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { FormInput } from "@components/Form";
import { useUserStore } from "@state/userStore";
import { UPDATE_USER_PASSWORD } from "@utils/queries/UpdateUserPassword";

const formSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Enter your current password." }),
    password: z.string().min(1, { message: "Enter a new password." }),
    passwordConfirm: z.string().min(1, { message: "Enter a new confirm password." }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "The new passwords did not match",
        path: ["passwordConfirm"],
      });
    }
  });

export const UpdatePasswordModal = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const {
    user: { userId },
  } = useUserStore();

  const [updatePassword, { loading, error: mutationError }] = useMutation(UPDATE_USER_PASSWORD);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values, event) => {
    event?.preventDefault();
    try {
      await updatePassword({
        variables: {
          userPasswordInput: {
            userId,
            currentPassword: values.currentPassword,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
          },
        },
      });
      reset();
      toggle();
      toast.success("Password updated successfully!");
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  return (
    <>
      <Button onClick={toggle} variant="outlined">
        Update password
      </Button>
      <Dialog open={open} handler={toggle} size="sm" className="outline-none">
        <DialogHeader>
          <Typography className="text-xl font-medium">Update your password</Typography>
        </DialogHeader>
        <DialogBody>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
              <FormInput
                name="currentPassword"
                type="password"
                label="Current Password"
                placeholder="*******"
                fieldError={errors.currentPassword}
              />
              <FormInput
                name="password"
                type="password"
                label="Password"
                placeholder="*******"
                fieldError={errors.password}
              />
              <FormInput
                name="passwordConfirm"
                type="password"
                label="Password confirmation"
                placeholder="*******"
                fieldError={errors.passwordConfirm}
              />

              <Typography variant="small" color="gray" className="mt-2 flex items-center gap-1 font-normal">
                <Info className="w-7 md:w-5" />
                Use at least 8 characters, one uppercase, one lowercase and one number and one special character.
              </Typography>

              {mutationError?.message && (
                <Typography variant="small" color="red">
                  {mutationError.message}
                </Typography>
              )}

              <div className="flex w-full justify-end gap-3">
                <Button
                  variant="outlined"
                  color="gray"
                  onClick={() => {
                    toggle();
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="gradient" color="blue" loading={loading} type="submit">
                  Update
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>
    </>
  );
};
