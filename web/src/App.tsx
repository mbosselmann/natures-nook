import styles from "./App.module.css";
import PlantCard from "./PlantCard";
import { useLoaderData } from "react-router-dom";
import AppHeader, { SearchParams } from "./AppHeader";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import { PlantData } from "./loader/plantsLoader";

const tags: string[] = [
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
  const {
    data: catalog,
    total,
    page: initialPage,
    limit,
    totalPages,
  } = useLoaderData() as PlantData;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(catalog);
  const [availableTags, setAvailableTags] = useState<string[]>(tags);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetchedPages = useRef(new Set<number>());

  const lastPlantElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [totalPages, page, loading]
  );

  function handleFilterPlants({
    searchParams,
    action,
  }: {
    searchParams?: SearchParams;
    action: "reset" | "filter";
  }) {
    if (action === "reset") {
      setFilteredPlants(catalog);
      setAvailableTags(tags);
      return;
    }

    if (action === "filter") {
      const search = searchParams?.searchTerm.toLowerCase();
      let filtered: Plant[] = catalog;
      if (search) {
        filtered = catalog?.filter((plant) => {
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
          filtered = [...filtered].sort((a, b) => {
            if (direction === "asc") {
              return a.sizes[0].price > b.sizes[0].price ? 1 : -1;
            } else {
              return a.sizes[0].price < b.sizes[0].price ? 1 : -1;
            }
          });
        }

        filtered = [...filtered].sort((a, b) => {
          if (direction === "asc") {
            return a[order] > b[order] ? 1 : -1;
          } else {
            return a[order] < b[order] ? 1 : -1;
          }
        });
      }
      const tags = new Set(filtered.map((plant) => plant.tags).flat());
      setAvailableTags(Array.from(tags));
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

  useEffect(() => {
    if (page !== initialPage && !fetchedPages.current.has(page)) {
      const fetchPlants = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/catalog/plants?page=${page}&limit=${limit}`
          );
          const data: PlantData = await response.json();
          setFilteredPlants((previousPlants) => [
            ...previousPlants,
            ...data.data,
          ]);
          fetchedPages.current.add(page);
        } catch (error) {
          console.error("Failed to fetch plants:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPlants();
    }
  }, [page, limit, initialPage]);

  return (
    <main className={styles["main"]}>
      <AppHeader
        tags={availableTags}
        isSearchOpen={isSearchOpen}
        onOpenSearch={handleOpenSearch}
        onFilterPlants={handleFilterPlants}
      />
      {filteredPlants?.length && (
        <p>
          {filteredPlants?.length} / {total} plants loaded
        </p>
      )}
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
