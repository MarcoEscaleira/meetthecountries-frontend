import { Typography } from "@material-tailwind/react";
import { RegisterForm } from "@components/Register/RegisterForm.tsx";

export function Component() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-0">
      <Typography variant="h1" className="pb-8 text-3xl">
        Create your account
      </Typography>

      <div className="px-2 md:px-0">
        <RegisterForm />
      </div>
    </div>
  );
}
