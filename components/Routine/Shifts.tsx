export default function Shifts({
   shifts,
   setShifts,
   setHasChanged
}: {
   shifts: {start: string; end: string}[]; // Update the type of shifts
   setShifts: Function;
   setHasChanged: Function;
}) {
   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      position: number,
      type: string
   ) => {
      const updatedShifts: {start: string; end: string}[] = [...shifts]; // Update the type of updatedShifts

      switch (type) {
         case "start":
            updatedShifts[position] = {
               ...updatedShifts[position],
               start: e.target.value
            };
            break;
         case "end":
            updatedShifts[position] = {
               ...updatedShifts[position],
               end: e.target.value
            };
            break;
      }

      setHasChanged(true);
      setShifts(updatedShifts);
      console.log(updatedShifts);
   };

   return (
      <>
         {shifts.map((shift, index) => (
            <td key={index}>
               <div className="grid grid-cols-3">
                  <label>From</label>

                  <input
                     className="text-sm col-span-2"
                     type="time"
                     value={shift.start}
                     onChange={(e) => handleChange(e, index, "start")}
                  />

                  <label>To</label>
                  <input
                     type="time"
                     className="text-sm col-span-2"
                     value={shift.end}
                     onChange={(e) => handleChange(e, index, "end")}
                  />
               </div>
            </td>
         ))}
      </>
   );
}
