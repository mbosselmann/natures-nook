import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Search.module.css";
import {
  initialSearchParams,
  SearchParams,
} from "../../settings/initialSearchParams";

export default function Search({
  tags,
  searchParams,
  onFilterPlants,
  onOpenSearch,
}: {
  tags: string[];
  searchParams: SearchParams;
  onFilterPlants: ({
    searchParams,
    action,
  }: {
    searchParams?: SearchParams;
    action: "reset" | "filter";
  }) => void;
  onOpenSearch: () => void;
}) {
  const [selectedSearchParams, setSelectedSearchParams] =
    useState<SearchParams>(searchParams);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const action = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;

    if (action.name === "search" || action.name === "filter") {
      onFilterPlants({ searchParams: selectedSearchParams, action: "filter" });
      onOpenSearch();
    }

    if (action.name === "reset") {
      setSelectedSearchParams(initialSearchParams);
      onFilterPlants({ action: "reset" });
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked, type } = event.target;
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
    return;
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className={styles["fieldset"]}>
        <legend className={styles["legend"]}>
          Looking for a specific plant? Search here!
        </legend>
        <label className={styles["search-label"]} htmlFor="searchTerm">
          Search for the plant name (or the scientific name)!
        </label>
        <div className={styles["search-input-group"]}>
          <input
            id="searchTerm"
            type="text"
            className={styles["search-input"]}
            onChange={handleInputChange}
            name="searchTerm"
            value={selectedSearchParams.searchTerm}
          />
          <button className={styles["button"]} type="submit" name="search">
            Search
          </button>
        </div>
      </fieldset>
      <fieldset className={`${styles["fieldset"]} ${styles["fieldset-flex"]}`}>
        <legend className={styles["legend"]}>Order by:</legend>
        <div>
          <label className={`${styles["label"]} ${styles["order-label"]}`}>
            <input
              className={styles["input-hidden"]}
              type="radio"
              name="order"
              value="name-asc"
              onChange={handleInputChange}
              checked={selectedSearchParams.order === "name-asc"}
            />
            Name (A-Z)
          </label>
          <label className={`${styles["label"]} ${styles["order-label"]}`}>
            <input
              className={styles["input-hidden"]}
              type="radio"
              name="order"
              value="name-desc"
              onChange={handleInputChange}
              checked={selectedSearchParams.order === "name-desc"}
            />
            Name (Z-A)
          </label>
        </div>
        <div>
          <label className={`${styles["label"]} ${styles["order-label"]}`}>
            <input
              className={styles["input-hidden"]}
              type="radio"
              name="order"
              value="scientific_name-asc"
              onChange={handleInputChange}
              checked={selectedSearchParams.order === "scientific_name-asc"}
            />
            Scientific Name (A-Z)
          </label>
          <label className={`${styles["label"]} ${styles["order-label"]}`}>
            <input
              className={styles["input-hidden"]}
              type="radio"
              name="order"
              value="scientific_name-desc"
              onChange={handleInputChange}
              checked={selectedSearchParams.order === "scientific_name-desc"}
            />
            Scientific Name (Z-A)
          </label>
        </div>
        <div>
          <label className={`${styles["label"]} ${styles["order-label"]}`}>
            <input
              className={styles["input-hidden"]}
              type="radio"
              name="order"
              value="price-asc"
              onChange={handleInputChange}
              checked={selectedSearchParams?.order === "price-asc"}
            />
            Price ASC
          </label>
          <label className={`${styles["label"]} ${styles["order-label"]}`}>
            <input
              className={styles["input-hidden"]}
              type="radio"
              name="order"
              value="price-desc"
              onChange={handleInputChange}
              checked={selectedSearchParams?.order === "price-desc"}
            />
            Price DESC
          </label>
        </div>
      </fieldset>
      <fieldset className={`${styles["fieldset"]} ${styles["fieldset-flex"]}`}>
        <legend className={styles["legend"]}>Filter by Care Level</legend>
        <label className={`${styles["label"]} ${styles["care-label"]}`}>
          <input
            className={styles["input-hidden"]}
            type="checkbox"
            name="careLevel"
            value="Easy"
            onChange={handleInputChange}
            checked={selectedSearchParams.careLevel.includes("Easy")}
          />
          Easy
        </label>
        <label className={`${styles["label"]} ${styles["care-label"]}`}>
          <input
            className={styles["input-hidden"]}
            type="checkbox"
            name="careLevel"
            value="Moderate"
            onChange={handleInputChange}
            checked={selectedSearchParams.careLevel.includes("Moderate")}
          />
          Moderate
        </label>
        <label className={`${styles["label"]} ${styles["care-label"]}`}>
          <input
            className={styles["input-hidden"]}
            type="checkbox"
            name="careLevel"
            value="Challenging"
            onChange={handleInputChange}
            checked={selectedSearchParams.careLevel.includes("Challenging")}
          />
          Challenging
        </label>
      </fieldset>
      <fieldset className={`${styles["fieldset"]} ${styles["fieldset-flex"]}`}>
        <legend className={styles["legend"]}>Filter by Categories</legend>
        {tags.map((tag) => (
          <label key={tag} className={styles["label"]}>
            <input
              className={styles["input-hidden"]}
              type="checkbox"
              name="categories"
              value={tag}
              onChange={handleInputChange}
              checked={selectedSearchParams.categories.includes(tag)}
            />
            {tag}
          </label>
        ))}
      </fieldset>
      <div className={styles["button-group"]}>
        <button className={styles["button"]} type="submit" name="filter">
          Filter
        </button>
        <button
          className={`${styles["button"]} ${styles["button-clear"]}`}
          type="submit"
          name="reset"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
