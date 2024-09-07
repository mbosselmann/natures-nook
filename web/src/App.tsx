import { useEffect, useState } from "react";
import "./App.css";
import PlantCard from "./PlantCard";

export type Plant = {
  id: number;
  scientific_name: string;
  name: string;
  description: string;
  price: number;
  light_requirements: string[];
  sizes: {
    height: string;
    price: number;
    size: string;
  }[];
  tags: string[];
};

function App() {
  const [catalog, setCatalog] = useState<Plant[]>([]);
  console.log(catalog);

  useEffect(() => {
    fetch("http://localhost/catalog/plants")
      .then((response) => response.json())
      .then((data) => setCatalog(data));
  }, []);

  return (
    <main>
      <h1> Nature's Nook</h1>
      <ul className="plant-list-grid">
        {catalog.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </ul>
    </main>
  );
}

export default App;
