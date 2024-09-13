import { Dispatch, SetStateAction } from "react";
import { Seller } from "./Seller";

export interface TransactionTableHooks {
  selectedSeller: Seller | undefined;
  setSelectedSeller: Dispatch<SetStateAction<Seller | undefined>>;
}