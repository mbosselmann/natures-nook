import type { Plant } from "./App";
import "./PlantCard.css";

const PlantCard = ({ plant }: { plant: Plant }) => {
  return (
    <li className="card" key={plant.name}>
      <div className="card__header">
        <h2>{plant.name}</h2>
        <p>{plant.scientific_name}</p>
      </div>
      <p className="card__description">{plant.description}</p>
      <ul className="card__tags">
        {plant.tags.map((tag) => {
          return <li key={tag}>{tag}</li>;
        })}
      </ul>
    </li>
  );
};

export default PlantCard;
