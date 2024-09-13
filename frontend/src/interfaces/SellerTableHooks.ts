import { Dispatch, SetStateAction } from "react";
import { Computer } from "./Computer";

export interface TableHooks {
  computers: Computer[];
  setComputers: Dispatch<SetStateAction<Computer[]>>;
  loadMoreData: () => void;
  hasMore: boolean;
}
