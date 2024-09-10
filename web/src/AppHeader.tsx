import styles from "./AppHeader.module.css";
import SearchIcon from "./assets/icons/search";
import Search from "./Search";

export default function AppHeader({
  onOpenSearch,
  isSearchOpen,
}: {
  onOpenSearch: () => void;
  isSearchOpen: boolean;
}) {
  return (
    <header className={styles["header"]}>
      <section className={styles["section"]}>
        <h1 className={styles["headline"]}> Nature's Nook</h1>
        <button
          className={styles["button"]}
          type="button"
          onClick={onOpenSearch}
        >
          <SearchIcon color={isSearchOpen ? "#22577a" : "#007f5f"} />
        </button>
      </section>
      {isSearchOpen && <Search />}
    </header>
  );
}
