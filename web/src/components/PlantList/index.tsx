import styles from "./PlantList.module.css";
import { useCallback, useRef } from "react";
import { PlantCard } from "..";
import { Catalog } from "../../AppLayout";

export default function PlantList({
  plants,
  loading,
  onUpdatePlantsPage,
}: {
  plants: Catalog;
  loading: boolean;
  onUpdatePlantsPage: () => void;
}) {
  const { total, page, totalPages } = plants;
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPlantElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page <= totalPages) {
          onUpdatePlantsPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, onUpdatePlantsPage, page, totalPages]
  );

  return (
    <ul className={styles["plant-list-grid"]}>
      {plants.data.map((plant, index) => (
        <li
          key={plant.id}
          ref={
            plants.data.length === index + 1 && index + 1 !== total
              ? lastPlantElementRef
              : null
          }
        >
          <PlantCard plant={plant} />
        </li>
      ))}
    </ul>
  );
}
