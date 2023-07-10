import {toast} from "react-hot-toast";

interface InputField {
   label: string;
   input: React.RefObject<HTMLInputElement | HTMLSelectElement>;
}

export default function validateForm(fields: InputField[]) {
   for (const {label, input} of fields) {
      if (input.current?.value === "") {
         toast.error(`${label} is required`);
         input.current?.focus();
         return true;
      }
   }

   return false;
}
