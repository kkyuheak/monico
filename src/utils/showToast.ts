import { toast } from "react-toastify";

export const showToast = (
  type: "success" | "error" | "info" | "warning",
  message: string
) => {
  toast[type](message, {
    theme: "colored",
    closeButton: false,
  });
};
