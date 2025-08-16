import { clsx, type ClassValue } from "clsx"
import Swal, { SweetAlertIcon } from "sweetalert2"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const AlertMessage = async (
  type: SweetAlertIcon,
  title = 'Confirm',
  text = 'Are you sure want to delete it?',
  cancelButtonText = 'No',
  confirmButtonText = 'Yes'
) => {
  return await Swal.fire({
    title,
    text,
    icon: type,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton: 'swal-confirm-btn',
      cancelButton: 'swal-cancel-btn'
    },
    buttonsStyling: false // disable default styles so custom classes apply
  })
}
