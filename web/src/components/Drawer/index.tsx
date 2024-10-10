import CloseButton from "../Buttons/CloseButton";
import styles from "./Drawer.module.css";
import { ReactNode, useEffect } from "react";

export default function Drawer({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <section className={`${styles["drawer"]} ${isOpen && styles["open"]}`}>
      <CloseButton onClose={onClose} />
      {children}
    </section>
  );
}
