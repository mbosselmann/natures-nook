import { useEffect, useState } from "react";
import styles from "./AppHeader.module.css";
import SearchIcon from "./assets/icons/SearchIcon";
import Search from "./Search";
import { SearchParams } from "./App";

type AppHeaderProps = {
  tags: string[];
  onSearchParams: (searchParams: SearchParams) => void;
  initialSearchParams: SearchParams;
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
  onSearchParams,
  initialSearchParams,
  onFilterPlants,
  filteredPlantsLength,
  totalAmountOfPlants,
}: AppHeaderProps) {
  const [selectedSearchParams, setSelectedSearchParams] =
    useState<SearchParams>(initialSearchParams);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleSelectedSearchParams(
    eventTarget: HTMLInputElement,
    action: string
  ) {
    if (action === "reset") {
      setSelectedSearchParams(initialSearchParams);
      return;
    }

    if (action === "filter") {
      const { name, value, checked, type } = eventTarget;
      const updatedSearchParams = (() => {
        if (type === "radio" || type === "text") {
          return {
            ...selectedSearchParams,
            [name]: value,
          };
        } else if (type === "checkbox") {
          return {
            ...selectedSearchParams,
            [name]: checked
              ? [
                  ...(selectedSearchParams[
                    name as keyof SearchParams
                  ] as string[]),
                  value,
                ]
              : (
                  selectedSearchParams[name as keyof SearchParams] as string[]
                ).filter((item) => item !== value),
          };
        }
        return selectedSearchParams;
      })();
      setSelectedSearchParams(updatedSearchParams);
      onSearchParams(updatedSearchParams);
      return;
    }
  }

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
          selectedSearchParams={selectedSearchParams}
          onFilterPlants={onFilterPlants}
          onSearchParams={handleSelectedSearchParams}
          onOpenSearch={handleOpenSearch}
        />
      )}
    </header>
  );
}
