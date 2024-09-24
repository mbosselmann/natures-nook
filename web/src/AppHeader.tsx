import { useState } from "react";
import styles from "./AppHeader.module.css";
import SearchIcon from "./assets/icons/SearchIcon";
import Search from "./Search";
import { SearchParams } from "./App";

// const tags: string[] = [
//   "Air Purifying",
//   "Low Maintenance",
//   "Drought Tolerant",
//   "Pet Friendly",
//   "Fast Growing",
//   "Flowering",
//   "Shade Tolerant",
//   "Medicinal",
//   "Succulent",
//   "Tropical",
//   "Statement Plant",
//   "Decorative",
//   "Classic",
//   "Easy Care",
//   "Colorful",
//   "No Soil",
//   "Unique Texture",
//   "Trailing",
//   "Unique Form",
//   "Holiday Plant",
// ];

export default function AppHeader({
  tags,
  onOpenSearch,
  onSearchParams,
  initialSearchParams,
  isSearchOpen,
  onFilterPlants,
  filteredPlantsLength,
  totalAmountOfPlants,
}: {
  filteredPlantsLength: number;
  totalAmountOfPlants: number;
  tags: string[];
  onOpenSearch: () => void;
  isSearchOpen: boolean;
  initialSearchParams: SearchParams;
  onSearchParams: (searchParams: SearchParams) => void;
  onFilterPlants: ({
    searchParams,
    action,
  }: {
    searchParams?: SearchParams;
    action: "reset" | "filter";
  }) => void;
}) {
  const [selectedSearchParams, setSelectedSearchParams] =
    useState<SearchParams>(initialSearchParams);

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
          onClick={onOpenSearch}
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
          onOpenSearch={onOpenSearch}
        />
      )}
    </header>
  );
}
