import { Link } from "react-router-dom";
import { PlantSize } from "../../PlantOverview";
import QuantityInput from "../../QuantityInput";
import { CartItem } from "../../../App";

export default function Item({ item }: { item: CartItem }) {
  const sizes = Array.from(Object.values(item)).filter(
    (size): size is PlantSize =>
      typeof size === "object" &&
      size !== null &&
      "amount" in size &&
      size.amount > 0
  );

  function changeAmount(size: string, action: string, value?: string) {
    console.log(size, action, value);
  }

  return (
    <fieldset>
      <legend>
        <Link to={`/plant/${item.catalogId}`}>{item.plantName}</Link>
      </legend>
      <ul>
        {sizes.map(({ size, id, height, price, amount, available }) => (
          <li key={id}>
            <label>
              {size} {price} {height} {available}
            </label>
            <QuantityInput
              onDecrease={() => changeAmount(size, "decrease")}
              onIncrease={() => changeAmount(size, "increase")}
              size={size}
              amount={amount}
              available={available}
              onChange={(value) => changeAmount(size, "change", value)}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
