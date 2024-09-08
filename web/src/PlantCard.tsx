import { Link } from "react-router-dom";
import type { Plant } from "./App";
import styles from "./PlantCard.module.css";
import plantUrl from "./assets/plant copy.svg";

const PlantCard = ({ plant }: { plant: Plant }) => {
  return (
    <article className={styles["card"]}>
      <div className={styles["card__header"]}>
        <h2>{plant.name}</h2>
      </div>
      <p className={styles["card__description"]}>
        <span className={styles["card__description--highlighted"]}>
          {plant.scientific_name}
        </span>
        : {plant.description}
      </p>
      <ul className={styles["card__tags"]}>
        {plant.tags.map((tag) => {
          return <li key={tag}>{tag}</li>;
        })}
      </ul>
      <img
        className={styles["image"]}
        width="300"
        height="200"
        src={plantUrl}
        alt={plant.name}
      />
      <Link to={`/plant/${plant.id}`} className={styles["card__link"]}>
        <span className="sr-only">Plant Details</span>
      </Link>
    </article>
  );
};

export default PlantCard;
