import styles from "./ScrollToTopButton.module.css";
import ArrowIcon from "./assets/icons/ArrowIcon";

export default function ScrollToTopButton() {
  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      onClick={handleScrollToTop}
      className={styles["button"]}
      aria-label="Scroll to top"
    >
      <ArrowIcon />
    </button>
  );
}
