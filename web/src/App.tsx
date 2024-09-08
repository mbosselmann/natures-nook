import styles from "./App.module.css";
import PlantCard from "./PlantCard";
import { useLoaderData } from "react-router-dom";

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

function App() {
  const { plants: catalog } = useLoaderData() as { plants: Plant[] };

  return (
    <main>
      <h1 className={styles["headline"]}> Nature's Nook</h1>
      <ul className={styles["plant-list-grid"]}>
        {catalog.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </ul>
    </main>
  );
}

export default App;
