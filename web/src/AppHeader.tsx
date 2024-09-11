import { useState } from "react";
import styles from "./AppHeader.module.css";
import SearchIcon from "./assets/icons/search";
import Search from "./Search";

export type SearchParams = {
  searchTerm: string;
  order: string;
  careLevel: string[];
  categories: string[];
};

export default function AppHeader({
  onOpenSearch,
  isSearchOpen,
  onFilterPlants,
}: {
  onOpenSearch: () => void;
  isSearchOpen: boolean;
  onFilterPlants: ({
    searchParams,
    action,
  }: {
    searchParams?: SearchParams;
    action: "reset" | "filter";
  }) => void;
}) {
  const [selectedSearchParams, setSelectedSearchParams] =
    useState<SearchParams>({
      searchTerm: "",
      order: "",
      careLevel: [] as string[],
      categories: [] as string[],
    });

  function handleSelectedSearchParams(
    eventTarget: HTMLInputElement,
    action: string
  ) {
    if (action === "reset") {
      setSelectedSearchParams({
        searchTerm: "",
        order: "",
        careLevel: [],
        categories: [],
      });
      return;
    }

    if (action === "filter") {
      const { name, value, checked, type } = eventTarget;
      setSelectedSearchParams((prevState: SearchParams) => {
        if (type === "radio" || type === "text") {
          return {
            ...prevState,
            [name]: value,
          };
        } else if (type === "checkbox") {
          return {
            ...prevState,
            [name]: checked
              ? [...(prevState[name as keyof SearchParams] as string[]), value]
              : (prevState[name as keyof SearchParams] as string[]).filter(
                  (item) => item !== value
                ),
          };
        }
        return prevState;
      });
      return;
    }
  }

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
      {isSearchOpen && (
        <Search
          selectedSearchParams={selectedSearchParams}
          onFilterPlants={onFilterPlants}
          onSearchParams={handleSelectedSearchParams}
        />
      )}
    </header>
  );
}
