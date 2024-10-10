import { useEffect, useState } from "react";
import styles from "./ScrollToTopButton.module.css";
import buttonStyles from "../Button.module.css";

import ArrowUpIcon from "../../../assets/icons/ArrowUpIcon";

export default function ScrollToTopButton() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showScrollToTop) return;

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className={`${buttonStyles["button"]} ${styles["button"]}`}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon width={30} height={30} color="#fff" />
    </button>
  );
}
