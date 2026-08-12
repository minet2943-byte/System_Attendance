import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const sharedOptions = {
  heightAuto: false,
  buttonsStyling: false,
  customClass: {
    popup: "rounded-2xl p-6",
    title: "text-xl font-bold text-slate-900",
    htmlContainer: "text-sm text-slate-500",
    confirmButton:
      "rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700",
    cancelButton:
      "rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50",
    actions: "gap-3",
  },
};

export const showSuccess = (message) =>
  Swal.fire({
    ...sharedOptions,
    icon: "success",
    title: "Success",
    text: message,
    confirmButtonText: "OK",
  });

export const showError = (message) =>
  Swal.fire({
    ...sharedOptions,
    icon: "error",
    title: "Something went wrong",
    text: message,
    confirmButtonText: "Try again",
    customClass: {
      ...sharedOptions.customClass,
      confirmButton:
        "rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700",
    },
  });

export const showWarning = (message) =>
  Swal.fire({
    ...sharedOptions,
    icon: "warning",
    title: "Please check your details",
    text: message,
    confirmButtonText: "OK",
  });

export const confirmDelete = (itemName) =>
  Swal.fire({
    ...sharedOptions,
    icon: "warning",
    title: "Delete this item?",
    text: `This will permanently delete ${itemName}.`,
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    focusCancel: true,
    customClass: {
      ...sharedOptions.customClass,
      confirmButton:
        "rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700",
    },
  }).then((result) => result.isConfirmed);
