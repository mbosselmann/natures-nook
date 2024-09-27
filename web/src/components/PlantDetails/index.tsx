import { Link } from "react-router-dom";
import styles from "./PlantDetails.module.css";
import ScrollToTopButton from "../ScrollToTopButton";
import plantUrl from "../../assets/green-plant.webp";
import backgroundUrl from "../../assets/plant copy.svg";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import { Plant } from "../PlantOverview";

export default function PlantDetails({ plant }: { plant: Plant }) {
  return (
    <main className={styles["main"]}>
      <header className={styles["header"]}>
        <Link
          to="/"
          className={styles["back-link"]}
          aria-label="back to plant overview"
        >
          <ArrowLeftIcon width={30} height={30} color="#000" />
        </Link>
        <h1 className={styles["headline"]}>{plant.name}</h1>
      </header>
      <div className={styles["wave"]}></div>
      <img
        className={styles["plant-image"]}
        height="200"
        src={plantUrl}
        alt={plant.name}
      />
      <section className={styles["section"]}>
        <h2>{plant.scientific_name}</h2>
        <p className={styles["description"]}>{plant.description}</p>
        <div>
          <h3>Light requirements:</h3>
          <ul>
            {plant.light_requirements.map((light, index) => (
              <li key={index}>{light}</li>
            ))}
          </ul>
        </div>
        <h3>Water requirements:</h3>
        <p>{plant.water_requirements}</p>
        <h3>Care level:</h3>
        <p>{plant.care_level}</p>
        <div>
          <h3>Sizes:</h3>
          <ul className={styles["sizes-list"]}>
            {plant.sizes.map((size, index) => (
              <li
                key={index}
                className={
                  size.amount === 0 ? styles["sizes-not-available"] : ""
                }
              >
                <h4>{size.size}</h4>
                <ul>
                  <li>{size.height}</li>
                  <li>{size.price} EUR</li>
                  <li>Amount: {size.amount}</li>
                </ul>
                <button
                  className={styles["available-text"]}
                  disabled={!!size.amount}
                >
                  {size.amount === 0 ? "Not available" : "Available"}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul className={styles["tags"]}>
          {plant.tags.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
      </section>
      <img
        className={styles["image"]}
        width="300"
        height="200"
        src={backgroundUrl}
        alt=""
      />
      <ScrollToTopButton />
    </main>
  );
}
