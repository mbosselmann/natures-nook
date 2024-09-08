import type { Plant } from "./App";
import styles from "./PlantCard.module.css";

const PlantCard = ({ plant }: { plant: Plant }) => {
  return (
    <li className={styles["card"]} key={plant.name}>
      <div className={styles["card__header"]}>
        <h2>{plant.name}</h2>
        <p>{plant.scientific_name}</p>
      </div>
      <p className={styles["card__description"]}>{plant.description}</p>
      <ul className={styles["card__tags"]}>
        {plant.tags.map((tag) => {
          return <li key={tag}>{tag}</li>;
        })}
      </ul>
    </li>
  );
};

export default PlantCard;
