import styles from "./CloseButton.module.css";
import buttonStyles from "../Button.module.css";

import CloseIcon from "../../../assets/icons/PlusIcon";

export default function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      className={`${buttonStyles["button"]} ${styles["close-button"]}`}
      onClick={onClose}
    >
      <span className="sr-only">Close</span>
      <span aria-hidden="true">
        <CloseIcon color="#fff" height={20} width={20} />
      </span>
    </button>
  );
}
