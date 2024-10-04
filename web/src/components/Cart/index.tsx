import { usePlants } from "../../hooks/usePlants";

export default function Cart() {
  const { order, setOrder } = usePlants();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {order.length ? "hi" : <p>Your cart is empty.</p>}
    </div>
  );
}
