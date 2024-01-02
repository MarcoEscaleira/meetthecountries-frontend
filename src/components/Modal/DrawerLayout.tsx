"use client";
import { ReactNode } from "react";
import { useModalWindow } from "react-modal-global";
import "./DrawerLayout.scss";

interface DrawerLayoutProps {
  width?: string;
  children: ReactNode;
}

export function DrawerLayout(props: DrawerLayoutProps) {
  const modal = useModalWindow();

  return (
    // @ts-expect-error: doesn't recognize custom css variables
    <div className="drawer-layout" style={{ "--drawer-width": props.width }}>
      <div className="drawer-layout__container">
        {modal.params.closable && (
          <button className="drawer-layout__close" type="button" onClick={modal.close}>
            &#9587;
          </button>
        )}
        <div className="drawer-layout__inner">{props.children}</div>
      </div>
    </div>
  );
}
