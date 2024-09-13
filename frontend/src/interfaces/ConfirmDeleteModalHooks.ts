import { Computer } from "./Computer";

export interface ConfirmDeleteModalHooks {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  computer: Computer;
}
