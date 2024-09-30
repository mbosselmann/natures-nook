import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import SearchIcon from "../../../assets/icons/SearchIcon";
import { SearchParams } from "../../../settings/initialSearchParams";
import { OrderButton, Search } from "../..";

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

export default function Header({
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
          Search
        </button>
        <OrderButton color="#007f5f" width={40} height={40} />
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
