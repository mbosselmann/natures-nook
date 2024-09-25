import styles from "./App.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  initialSearchParams,
  SearchParams,
} from "./settings/initialSearchParams";
import { AppHeader, PlantCard, ScrollToTopButton } from "./components";
import { usePlants } from "./hooks/usePlants";

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

const findAvailableTags = (plants: Plant[]) => {
  const tags = new Set<string>(plants?.map((plant) => plant.tags).flat());
  return Array.from(tags);
};

export default function App() {
  const [searchParams, setSearchParams] =
    useState<SearchParams>(initialSearchParams);
  const [plants, setFilteredPlants] = usePlants();
  const { data: filteredPlants, total, limit, page, totalPages } = plants;
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetchedPage = useRef<number>(page ?? 0);

  const availableTags = useMemo(
    () => findAvailableTags(filteredPlants),
    [filteredPlants]
  );

  const lastPlantElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page <= totalPages) {
          setFilteredPlants((prevState) => ({
            ...prevState,
            page: prevState.page + 1,
          }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, page, setFilteredPlants, totalPages]
  );

  const handleFilterPlants = async ({
    searchParams,
    action,
  }: {
    searchParams?: SearchParams;
    action: "reset" | "filter";
  }) => {
    if (action === "reset") {
      const response = await fetch("/catalog/plants?page=1&limit=12");
      const plants = await response.json();
      setFilteredPlants(plants);
      setSearchParams(initialSearchParams);
      fetchedPage.current = 1;
    }

    if (action === "filter" && searchParams) {
      const response = await fetch("/catalog/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchParams),
      });

      const plants = await response.json();
      setFilteredPlants(plants);
      setSearchParams(searchParams);
      fetchedPage.current = 1;
    }
  };

  useEffect(() => {
    if (fetchedPage.current === totalPages) {
      return;
    }

    if (page > 1 && page <= totalPages) {
      const fetchPlants = async () => {
        setLoading(true);
        try {
          let data = [];
          if (
            searchParams.searchTerm ||
            searchParams.categories.length ||
            searchParams.careLevel.length ||
            searchParams.order
          ) {
            const response = await fetch("/catalog/search", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...searchParams,
                page,
                limit,
              }),
            });
            const plants = await response.json();
            data = plants;
          } else {
            const response = await fetch(
              `/catalog/plants?page=${page}&limit=${limit}`
            );
            const plants = await response.json();
            data = plants;
          }
          setFilteredPlants((previousPlants) => ({
            ...data,
            data: [...previousPlants.data, ...data.data],
          }));
          fetchedPage.current = page;
        } catch (error) {
          console.error("Failed to fetch plants:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPlants();
    }
  }, [page, limit, searchParams, totalPages, setFilteredPlants, total]);

  return (
    <main className={styles["main"]}>
      <AppHeader
        tags={availableTags}
        searchParams={searchParams}
        onFilterPlants={handleFilterPlants}
        filteredPlantsLength={filteredPlants?.length ?? 0}
        totalAmountOfPlants={total ?? 0}
      />

      {filteredPlants?.length ? (
        <ul className={styles["plant-list-grid"]}>
          {filteredPlants.map((plant, index) => (
            <li
              key={plant.id}
              ref={
                filteredPlants.length === index + 1 && index + 1 !== total
                  ? lastPlantElementRef
                  : null
              }
            >
              <PlantCard plant={plant} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles["no-results"]}>No results found.</p>
      )}
      <ScrollToTopButton />
    </main>
  );
}
