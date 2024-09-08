import { useLoaderData } from "react-router-dom";
import { Plant } from "../App";

export default function PlantDetailsPage() {
  const { plant } = useLoaderData() as { plant: Plant };
  return (
    <li className="card" key={plant.name}>
      <div className="card__header">
        <h2>{plant.name}</h2>
        <p>{plant.scientific_name}</p>
      </div>
      <p className="card__description">{plant.description}</p>
      <section className="card__section">
        <div>
          <h3>Light requirements:</h3>
          <ul>
            {plant.light_requirements.map((light) => (
              <li key={light}>{light}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Sizes:</h3>
          <ul>
            {plant.sizes.map((size, index) => (
              <li key={index}>
                <h4>
                  {size.height} - {size.size}
                </h4>
                <p>{size.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ul className="card__tags">
        {plant.tags.map((tag) => {
          return <li key={tag}>{tag}</li>;
        })}
      </ul>
    </li>
  );
}
