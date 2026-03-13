import { toast } from "react-toastify";
import { MdCheckCircle, MdError } from "react-icons/md";

// Toast for success
export const showSuccessToast = (message) => {
  toast.success(message || "Success", {
    icon: <MdCheckCircle />,
    autoClose: 1000,
  });
};

// Toast for error
export const showErrorToast = (message) => {
  toast.error(message || "Something went wrong", {
    icon: <MdError />,
    autoClose: 1500,
  });
};
