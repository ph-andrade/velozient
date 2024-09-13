import { Computer } from "./Computer";

export interface ComputerFormModalHooks {
  show: boolean;
  onClose: () => void;
  computer?: Computer;
  onSave: (computer: Computer, computerId: number) => void;
}
