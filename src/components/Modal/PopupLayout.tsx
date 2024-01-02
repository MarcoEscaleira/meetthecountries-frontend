"use client";
import { ReactNode } from "react";
import { useModalWindow } from "react-modal-global";
import "./PopupLayout.scss";

interface PopupLayoutProps {
  width?: string;
  children: ReactNode;
}

export function PopupLayout(props: PopupLayoutProps) {
  const modal = useModalWindow();

  return (
    // @ts-expect-error: doesn't recognize custom css variables
    <div className="popup-layout" style={{ "--popup-width": props.width }}>
      <div className="popup-layout__container">
        {modal.params.closable && (
          <button className="popup-layout__close" type="button" onClick={modal.close}>
            &#9587;
          </button>
        )}
        <div className="popup-layout__inner">{props.children}</div>
      </div>
    </div>
  );
}
