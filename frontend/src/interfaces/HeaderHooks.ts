import { Computer } from "./Computer";

export interface HeaderHooks {
  openFormModal: (computer: Computer | null) => void;
}
