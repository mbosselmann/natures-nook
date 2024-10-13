import styles from "./Cart.module.css";

import { usePlants } from "../../hooks/usePlants";

import Form from "./Form";

export default function Cart() {
  const { cartItems } = usePlants();
  return (
    <div className={styles[cartItems.length && "cart"]}>
      <h2>Shopping Cart</h2>
      {cartItems.length ? (
        <Form cartItems={cartItems} />
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
