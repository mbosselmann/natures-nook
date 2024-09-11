import { FormEvent, useState } from "react";
import styles from "./Search.module.css";

const tags = [
  "Air Purifying",
  "Low Maintenance",
  "Drought Tolerant",
  "Pet Friendly",
  "Fast Growing",
  "Flowering",
  "Shade Tolerant",
  "Medicinal",
  "Succulent",
  "Tropical",
  "Statement Plant",
  "Decorative",
  "Classic",
  "Easy Care",
  "Colorful",
  "No Soil",
  "Unique Texture",
  "Trailing",
  "Unique Form",
  "Holiday Plant",
];

export default function Search() {
  const [selectedSearchParams, setSelectedSearchParams] = useState({
    searchTerm: "",
    order: "",
    careLevel: [],
    categories: [],
  });
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const action = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;

    if (action.name === "reset") {
      console.log("Clearing...");
      (event.target as HTMLFormElement).reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles["form"]}>
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
            onChange={(event) =>
              setSelectedSearchParams({
                ...selectedSearchParams,
                searchTerm: event.target.value,
              })
            }
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
              value="nameasc"
            />
            Name (A-Z)
          </label>
          <label className={`${styles["label"]} ${styles["order-label"]}`}>
            <input
              className={styles["input-hidden"]}
              type="radio"
              name="order"
              value="namedesc"
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
              value="scientificasc"
            />
            Scientific Name (A-Z)
          </label>
          <label className={`${styles["label"]} ${styles["order-label"]}`}>
            <input
              className={styles["input-hidden"]}
              type="radio"
              name="order"
              value="scientificdesc"
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
              value="priceasc"
            />
            Price ASC
          </label>
          <label className={`${styles["label"]} ${styles["order-label"]}`}>
            <input
              className={styles["input-hidden"]}
              type="radio"
              name="order"
              value="pricedesc"
            />
            Price DESC
          </label>
        </div>
      </fieldset>
      <fieldset className={`${styles["fieldset"]} ${styles["fieldset-flex"]}`}>
        <legend className={styles["legend"]}>Filtey by Care Level</legend>
        <label className={`${styles["label"]} ${styles["care-label"]}`}>
          <input
            className={styles["input-hidden"]}
            type="checkbox"
            value="Easy"
          />
          Easy
        </label>
        <label className={`${styles["label"]} ${styles["care-label"]}`}>
          <input
            className={styles["input-hidden"]}
            type="checkbox"
            value="Moderate"
          />
          Moderate
        </label>
        <label className={`${styles["label"]} ${styles["care-label"]}`}>
          <input
            className={styles["input-hidden"]}
            type="checkbox"
            value="Challenging"
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
              value={tag}
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
