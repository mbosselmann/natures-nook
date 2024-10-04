import styles from "./PlantOverview.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  initialSearchParams,
  SearchParams,
} from "../../settings/initialSearchParams";
import { Header, ScrollToTopButton, PlantList } from "../";
import { usePlants } from "../../hooks/usePlants";

export type PlantSize = "Small" | "Medium" | "Large" | "Hanging Basket";

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
    size: PlantSize;
    amount: number;
    id: number;
    category: number;
  }[];
  tags: string[];
};

const findAvailableTags = (plants: Plant[]) => {
  const tags = new Set<string>(plants?.map((plant) => plant.tags).flat());
  return Array.from(tags);
};

export default function PlantOverview() {
  const [searchParams, setSearchParams] =
    useState<SearchParams>(initialSearchParams);
  const { plants, setPlants: setFilteredPlants } = usePlants();
  const { data: filteredPlants, total, limit, page, totalPages } = plants;
  const [loading, setLoading] = useState(false);
  const fetchedPage = useRef<number>(page ?? 0);

  const availableTags = useMemo(
    () => findAvailableTags(filteredPlants),
    [filteredPlants]
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

  const handleUpdatePlantsPage = useCallback(() => {
    setFilteredPlants((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  }, [setFilteredPlants]);

  useEffect(() => {
    if (fetchedPage.current === totalPages || fetchedPage.current === page) {
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
      <Header
        tags={availableTags}
        searchParams={searchParams}
        onFilterPlants={handleFilterPlants}
        filteredPlantsLength={filteredPlants?.length ?? 0}
        totalAmountOfPlants={total ?? 0}
      />

      {filteredPlants?.length ? (
        <PlantList
          plants={plants}
          loading={loading}
          onUpdatePlantsPage={handleUpdatePlantsPage}
        />
      ) : (
        <p className={styles["no-results"]}>No plants found.</p>
      )}
      <ScrollToTopButton />
    </main>
  );
}
