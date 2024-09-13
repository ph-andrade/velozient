import { Dispatch, SetStateAction } from "react";

export interface ExportFileHooks {
  loadSellers: Function
  setLoading: Dispatch<SetStateAction<boolean>>;
}