import { toast } from "react-toastify";

export function NotifyError(message: string): void {
  toast.error(`Error: ${message}`, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export function NotifySucess(message: string): void {
  toast.success(`Sucess: ${message}`, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}