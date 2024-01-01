"use client";
import { lazy } from "react";
import { ModalController } from "react-modal-global";

export enum ModalType {
  LoginForm
}

// @ts-ignore
export const Modal: ModalController = new ModalController({
  components: {
    [ModalType.LoginForm]: lazy(() => import("@/components/Login/LoginForm")),
  },
});
