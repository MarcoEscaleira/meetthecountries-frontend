import { Typography } from "@material-tailwind/react";
import { RegisterForm } from "@components/Register/RegisterForm.tsx";

export function Component() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-0">
      <Typography variant="h1" className="pb-8">
        Create your account
      </Typography>

      <RegisterForm />
    </div>
  );
}
