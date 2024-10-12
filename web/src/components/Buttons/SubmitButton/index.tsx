import styles from "../Button.module.css";
import buttonStyles from "./SubmitButton.module.css";

export default function SubmitButton({
  isDisabled,
  text,
}: {
  isDisabled: boolean;
  text: string;
}) {
  return (
    <button
      className={`${styles["button"]} ${buttonStyles["submit-button"]}`}
      disabled={isDisabled}
      type="submit"
    >
      {text}
    </button>
  );
}
