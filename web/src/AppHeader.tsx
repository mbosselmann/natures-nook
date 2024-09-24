import { useEffect, useState } from "react";
import styles from "./AppHeader.module.css";
import SearchIcon from "./assets/icons/SearchIcon";
import Search from "./Search";
import { SearchParams } from "./settings/initialSearchParams";

type AppHeaderProps = {
  tags: string[];
  searchParams: SearchParams;
  onFilterPlants: ({
    searchParams,
    action,
  }: {
    searchParams?: SearchParams;
    action: "reset" | "filter";
  }) => void;
  filteredPlantsLength: number;
  totalAmountOfPlants: number;
};

export default function AppHeader({
  tags,
  searchParams,
  onFilterPlants,
  filteredPlantsLength,
  totalAmountOfPlants,
}: AppHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleOpenSearch() {
    setIsSearchOpen(!isSearchOpen);
  }

  useEffect(() => {
    if (isSearchOpen) {
      document.body.classList.add(styles["no-scroll"]);
    } else {
      document.body.classList.remove(styles["no-scroll"]);
    }
  }, [isSearchOpen]);

  return (
    <header className={styles["header"]}>
      <section className={styles["section"]}>
        <h1 className={styles["headline"]}> Nature's Nook</h1>
        <p>
          {filteredPlantsLength} / {totalAmountOfPlants} plants loaded
        </p>
        <button
          className={styles["button"]}
          type="button"
          onClick={handleOpenSearch}
          aria-label="search plant"
        >
          <SearchIcon color={isSearchOpen ? "#22577a" : "#007f5f"} />
        </button>
      </section>
      {isSearchOpen && (
        <Search
          tags={tags}
          searchParams={searchParams}
          onFilterPlants={onFilterPlants}
          onOpenSearch={handleOpenSearch}
        />
      )}
    </header>
  );
}
