import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";

export function usePlants() {
  return useOutletContext<ContextType>();
}
