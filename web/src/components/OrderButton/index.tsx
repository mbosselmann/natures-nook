import styles from "./OrderButtton.module.css";
import OrderIcon from "../../assets/icons/OrderIcon";

type OrderButtonProps = {
  color?: string;
  width?: number;
  height?: number;
};

export default function OrderButton({
  color = "#000",
  width = 123,
  height = 81,
}: OrderButtonProps) {
  return (
    <button type="button" className={styles["order-button"]}>
      <OrderIcon width={width} height={height} color={color} />
      Basket
    </button>
  );
}
