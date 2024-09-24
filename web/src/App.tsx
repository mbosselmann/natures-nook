import styles from "./App.module.css";
import PlantCard from "./PlantCard";
import { useLoaderData } from "react-router-dom";
import AppHeader from "./AppHeader";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import { PlantData } from "./loader/plantsLoader";

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
  const {
    data: catalog,
    total,
    page: initialPage,
    limit,
    totalPages,
  } = useLoaderData() as PlantData;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParams, setSearchParams] =
    useState<SearchParams>(initialSearchParams);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(catalog);
  const [availableTags, setAvailableTags] = useState<string[]>(() =>
    findAvailableTags(catalog)
  );
  const [totalAmountOfPlants, setTotalAmountOfPlants] = useState(total);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetchedPage = useRef<number>(initialPage);
  const totalPagesRef = useRef<number>(totalPages);

  const lastPlantElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page <= totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [totalPages, page, loading]
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
      const { data: plants, total, totalPages } = await response.json();
      setFilteredPlants(plants);
      totalPagesRef.current = totalPages;
      fetchedPage.current = 1;
      setAvailableTags(() => findAvailableTags(plants));
      setTotalAmountOfPlants(total);
    }

    if (action === "filter" && searchParams) {
      const response = await fetch("/catalog/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchParams),
      });

      const { data: plants, totalPages, total } = await response.json();
      setFilteredPlants(plants);
      setPage(1);
      fetchedPage.current = 1;
      totalPagesRef.current = totalPages;
      setTotalAmountOfPlants(total);

      if (plants.length) {
        const tags = new Set<string>(
          plants.map((plant: Plant) => plant.tags).flat()
        );
        setAvailableTags(Array.from(tags));
      }
    }
  }

  function handleOpenSearch() {
    setIsSearchOpen(!isSearchOpen);
  }

  function handleSearchParams(searchParams: SearchParams) {
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (isSearchOpen) {
      document.body.classList.add(styles["no-scroll"]);
    } else {
      document.body.classList.remove(styles["no-scroll"]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (page !== initialPage && page !== fetchedPage.current) {
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
              body: JSON.stringify({ ...searchParams, page, limit }),
            });
            const { data: plants } = await response.json();
            data = plants;
          } else {
            const response = await fetch(
              `/catalog/plants?page=${page}&limit=${limit}`
            );
            const plants: PlantData = await response.json();
            data = plants.data;
          }
          setFilteredPlants((previousPlants) => [...previousPlants, ...data]);

          setAvailableTags((previousTags) => {
            const tags = findAvailableTags(data);
            return Array.from(new Set([...previousTags, ...tags]));
          });

          fetchedPage.current = page;
        } catch (error) {
          console.error("Failed to fetch plants:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPlants();
    }
  }, [page, limit, initialPage, searchParams]);

  return (
    <main className={styles["main"]}>
      <AppHeader
        tags={availableTags}
        isSearchOpen={isSearchOpen}
        initialSearchParams={initialSearchParams}
        onOpenSearch={handleOpenSearch}
        onSearchParams={handleSearchParams}
        onFilterPlants={handleFilterPlants}
        filteredPlantsLength={filteredPlants?.length ?? 0}
        totalAmountOfPlants={totalAmountOfPlants}
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
