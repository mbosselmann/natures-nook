import styles from "./PlantDetails.module.css";
import { Link } from "react-router-dom";
import backgroundUrl from "../../assets/plant copy.svg";
import plantUrl from "../../assets/green-plant.webp";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import { Plant } from "../PlantOverview";
import { Cart, Drawer, PlantForm } from "..";
import { useState } from "react";
import { Order } from "../../App";
import { usePlants } from "../../hooks/usePlants";
import { OrderButton, ScrollToTopButton } from "../Buttons";

export default function PlantDetails({ plant }: { plant: Plant }) {
  const { orders, setOrders } = usePlants();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function handleDrawerOpen() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  function handleSubmit(newOrder: Order) {
    setOrders([...orders, newOrder]);
  }

  return (
    <main className={styles["main"]}>
      <header className={styles["header"]}>
        <div className={styles["header-actions"]}>
          <Link
            to="/"
            className={styles["back-link"]}
            aria-label="back to plant overview"
          >
            <ArrowLeftIcon width={30} height={30} color="#000" />
            Back
          </Link>
          <OrderButton width={40} height={40} onClick={handleDrawerOpen} />
        </div>
        <h1>{plant.name}</h1>
      </header>
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerOpen}>
        <Cart />
      </Drawer>
      <div className={styles["wave"]}></div>
      <img
        className={styles["plant-image"]}
        height="200"
        src={plantUrl}
        alt={plant.name}
      />
      <h2>{plant.scientific_name}</h2>
      {plant.sizes.length && (
        <PlantForm
          type="new"
          sizes={plant.sizes}
          name={plant.name}
          id={plant.id}
          onSubmit={handleSubmit}
        />
      )}
      <section className={styles["section"]}>
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
