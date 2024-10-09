import styles from "./Cart.module.css";
import { usePlants } from "../../hooks/usePlants";
import Item from "./Item";

export default function Cart() {
  const { orders } = usePlants();

  return (
    <div className={styles["cart"]}>
      <h2>Shopping Cart</h2>
      {orders.length ? (
        <>
          <ul className={styles["list"]}>
            {orders.map((plant) => (
              <li key={plant.catalogId}>
                <Item plant={plant} />
              </li>
            ))}
          </ul>
          <p>Total: SUM</p>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
