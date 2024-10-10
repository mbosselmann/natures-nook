import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import SearchIcon from "../../../assets/icons/SearchIcon";
import { SearchParams } from "../../../settings/initialSearchParams";
import { Cart, Modal, Search } from "../..";
import { OrderButton } from "../../Buttons";

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
  const [openSection, setOpenSection] = useState("");

  function handleOpenSearch(section?: "search" | "order") {
    if (section) {
      setOpenSection(section);
    } else {
      setOpenSection("");
    }
  }

  useEffect(() => {
    if (openSection) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [openSection]);

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
          onClick={() =>
            handleOpenSearch(openSection === "search" ? undefined : "search")
          }
          aria-label="search plant"
        >
          <SearchIcon
            color={openSection === "search" ? "#22577a" : "#007f5f"}
          />
          Search
        </button>
        <OrderButton
          onClick={() =>
            handleOpenSearch(openSection === "order" ? undefined : "order")
          }
          color={openSection === "order" ? "#22577a" : "#007f5f"}
          width={40}
          height={40}
        />
      </section>
      {openSection && (
        <Modal>
          {openSection === "search" && (
            <Search
              tags={tags}
              searchParams={searchParams}
              onFilterPlants={onFilterPlants}
              onOpenSearch={handleOpenSearch}
            />
          )}
          {openSection === "order" && <Cart />}
        </Modal>
      )}
    </header>
  );
}
