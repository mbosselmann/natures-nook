import styles from "./Drawer.module.css";
import { ReactNode, useEffect } from "react";
import CloseIcon from "../../assets/icons/PlusIcon";

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
      <button
        type="button"
        className={styles["close-button"]}
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <span aria-hidden="true">
          <CloseIcon color="#fff" height={20} width={20} />
        </span>
      </button>
      {children}
    </section>
  );
}
