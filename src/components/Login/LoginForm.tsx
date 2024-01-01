"use client";
import { useModalWindow } from "react-modal-global";
import { PopupLayout } from "@/components";

export function LoginForm() {
  const modal = useModalWindow();

  return (
    <PopupLayout>
      <h2>Login to your account</h2>
    </PopupLayout>
  );
}

export default LoginForm;
