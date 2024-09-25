import { useOutletContext } from "react-router-dom";
import { ContextType } from "../AppLayout";

export function usePlants() {
  return useOutletContext<ContextType>();
}
