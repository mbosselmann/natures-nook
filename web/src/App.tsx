import styles from "./App.module.css";
import PlantCard from "./PlantCard";
import { useLoaderData } from "react-router-dom";
import AppHeader from "./AppHeader";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import { PlantData } from "./loader/plantsLoader";

type Catalog = {
  data: Plant[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
};

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

export type SearchParams = {
  searchTerm: string;
  order: string;
  careLevel: string[];
  categories: string[];
};

const initialSearchParams: SearchParams = {
  searchTerm: "",
  order: "",
  careLevel: [] as string[],
  categories: [] as string[],
};

const findAvailableTags = (plants: Plant[]) => {
  const tags = new Set<string>(plants?.map((plant) => plant.tags).flat());
  return Array.from(tags);
};

export default function App() {
  const catalog = useLoaderData() as PlantData;
  const [searchParams, setSearchParams] =
    useState<SearchParams>(initialSearchParams);
  const [
    { data: filteredPlants, total, limit, page, totalPages },
    setFilteredPlants,
  ] = useState<Catalog>(catalog);
  const [availableTags, setAvailableTags] = useState<string[]>(() =>
    findAvailableTags(catalog.data)
  );
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

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
    [loading, page, totalPages]
  );

  async function handleFilterPlants({
    searchParams,
    action,
  }: {
    searchParams?: SearchParams;
    action: "reset" | "filter";
  }) {
    if (action === "reset") {
      const response = await fetch("/catalog/plants?page=1&limit=12");
      const plants = await response.json();
      setFilteredPlants(plants);
      setSearchParams(initialSearchParams);
      setAvailableTags(() => findAvailableTags(plants.data));
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

      if (plants.data.length) {
        const tags = new Set<string>(
          plants.data.map((plant: Plant) => plant.tags).flat()
        );
        setAvailableTags(Array.from(tags));
      }
    }
  }

  function handleSearchParams(searchParams: SearchParams) {
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (page > 1 && page !== totalPages + 1) {
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

          setAvailableTags((previousTags) => {
            const tags = findAvailableTags(data.data);
            return Array.from(new Set([...previousTags, ...tags]));
          });
        } catch (error) {
          console.error("Failed to fetch plants:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPlants();
    }
  }, [page, limit, searchParams, totalPages]);

  return (
    <main className={styles["main"]}>
      <AppHeader
        tags={availableTags}
        initialSearchParams={initialSearchParams}
        onSearchParams={handleSearchParams}
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
