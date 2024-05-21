import { ORDER_BY_RECENT } from "@/lib/utils";
import  { useRef } from "react";

export const useFiltersRef = () => {
  const instrument = useRef();
  const sort = useRef(ORDER_BY_RECENT);
  const media = useRef();

  return {
    instrument,
    media,
    sort,
  };
};
