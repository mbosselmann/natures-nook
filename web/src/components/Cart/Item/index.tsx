import { Order } from "../../../App";
import PlantForm from "../../PlantForm";
import { PlantSize } from "../../PlantOverview";

export default function Item({ plant }: { plant: Order }) {
  const sizes = Array.from(Object.values(plant)).filter(
    (size): size is PlantSize =>
      typeof size === "object" &&
      size !== null &&
      "amount" in size &&
      size.amount > 0
  );

  return (
    <article>
      <h3>{plant.plantName}</h3>
      <ul>
        <li>
          <PlantForm
            type="edit"
            order={plant}
            sizes={sizes}
            onSubmit={() => console.log("HELLO IT'S ME")}
          />
        </li>
      </ul>
    </article>
  );
}
