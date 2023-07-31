export default function convert24to12(time24: string): string {
   const [hours, minutes] = time24.split(":").map(Number);

   if (hours === 0) {
      return `12:${padWithZero(minutes)} AM`;
   } else if (hours < 12) {
      return `${hours}:${padWithZero(minutes)} AM`;
   } else if (hours === 12) {
      return `12:${padWithZero(minutes)} PM`;
   } else {
      return `${hours - 12}:${padWithZero(minutes)} PM`;
   }
}

function padWithZero(num: number): string {
   return num.toString().padStart(2, "0");
}
