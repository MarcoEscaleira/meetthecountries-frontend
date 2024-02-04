import { RegisterForm } from "@components/Register/RegisterForm.tsx";

export default function Register() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center flex-col">
      <h1>Create your account</h1>

      <RegisterForm />
    </div>
  );
}
