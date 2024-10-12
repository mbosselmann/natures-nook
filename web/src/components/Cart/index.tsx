import styles from "./Cart.module.css";
import { usePlants } from "../../hooks/usePlants";
import Item from "./Item";

export default function Cart() {
  const { cartItems } = usePlants();

  return (
    <div className={styles[cartItems.length && "cart"]}>
      <h2>Shopping Cart</h2>
      {cartItems.length ? (
        <>
          <form>
            <ul className={styles["list"]}>
              {cartItems.map((item) => (
                <li key={item.catalogId}>
                  <Item item={item} />
                </li>
              ))}
            </ul>
          </form>
          <p>Total: SUM</p>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
