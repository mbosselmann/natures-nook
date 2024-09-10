import styles from "./App.module.css";
import PlantCard from "./PlantCard";
import { useLoaderData } from "react-router-dom";
import AppHeader from "./AppHeader";
import { useEffect, useState } from "react";

export type Plant = {
  id: number;
  scientific_name: string;
  name: string;
  description: string;
  price: number;
  light_requirements: string[];
  water_requirements: string;
  care_level: string;
  sizes: {
    height: string;
    price: number;
    size: string;
    amount: number;
  }[];
  tags: string[];
};

export default function App() {
  const { plants: catalog } = useLoaderData() as { plants: Plant[] };
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
    <main className={styles["main"]}>
      <AppHeader isSearchOpen={isSearchOpen} onOpenSearch={handleOpenSearch} />
      <ul className={styles["plant-list-grid"]}>
        {catalog.map((plant) => (
          <li key={plant.id}>
            <PlantCard plant={plant} />
          </li>
        ))}
      </ul>
    </main>
  );
}
