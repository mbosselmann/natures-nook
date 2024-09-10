import { Plant } from "./App";
import styles from "./PlantDetails.module.css";
import plantUrl from "./assets/green-plant.webp";
import backgroundUrl from "./assets/plant copy.svg";

export default function PlantDetailsPage({ plant }: { plant: Plant }) {
  return (
    <main className={styles["main"]}>
      <header className={styles["header"]}>
        <h1>{plant.name}</h1>
      </header>
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
          <ul>
            {plant.sizes.map((size, index) => (
              <li key={index}>
                <h4>
                  {size.height} - {size.size}
                </h4>
                {size.price}, Amount: {size.amount}
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
    </main>
  );
}
