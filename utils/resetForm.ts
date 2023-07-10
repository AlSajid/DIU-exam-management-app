export default function resetForm(fields: React.RefObject<HTMLInputElement>[] | any) {
   for (const field of fields) {
      field.current.value = "";
   }
}
