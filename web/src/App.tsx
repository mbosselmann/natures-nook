import styles from "./App.module.css";
import PlantCard from "./PlantCard";
import { useLoaderData } from "react-router-dom";
import AppHeader, { SearchParams } from "./AppHeader";
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
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(catalog);

  function handleFilterPlants({
    searchParams,
    action,
  }: {
    searchParams?: SearchParams;
    action: "reset" | "filter";
  }) {
    if (action === "reset") {
      setFilteredPlants(catalog);
      return;
    }

    if (action === "filter") {
      const search = searchParams?.searchTerm.toLowerCase();
      let filtered: Plant[] = catalog;
      if (search) {
        filtered = catalog.filter((plant) => {
          return (
            plant.name.toLowerCase().includes(search) ||
            plant.scientific_name.toLowerCase().includes(search)
          );
        });
      }
      if (searchParams?.careLevel.length) {
        filtered = filtered.filter((plant) => {
          return searchParams.careLevel.includes(plant.care_level);
        });
      }

      if (searchParams?.categories.length) {
        filtered = filtered.filter((plant) => {
          return searchParams.categories.every((category) =>
            plant.tags.includes(category)
          );
        });
      }

      if (searchParams?.order) {
        const params = searchParams.order.split("-");
        const order = params[0] as keyof Plant;
        const direction = params[1];

        if (order === "price") {
          filtered = filtered.sort((a, b) => {
            if (direction === "asc") {
              return a.sizes[0].price > b.sizes[0].price ? 1 : -1;
            } else {
              return a.sizes[0].price < b.sizes[0].price ? 1 : -1;
            }
          });
        }

        filtered = filtered.sort((a, b) => {
          if (direction === "asc") {
            return a[order] > b[order] ? 1 : -1;
          } else {
            return a[order] < b[order] ? 1 : -1;
          }
        });
      }

      setFilteredPlants(filtered);
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
    <main className={styles["main"]}>
      <AppHeader
        isSearchOpen={isSearchOpen}
        onOpenSearch={handleOpenSearch}
        onFilterPlants={handleFilterPlants}
      />
      <ul className={styles["plant-list-grid"]}>
        {filteredPlants.map((plant) => (
          <li key={plant.id}>
            <PlantCard plant={plant} />
          </li>
        ))}
      </ul>
    </main>
  );
}
