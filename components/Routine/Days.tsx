export default function Days({
   serial,
   days,
   setDays,
   setHasChanged,
   i
}: {
   serial: number;
   days: string[];
   setDays: Function;
   setHasChanged: Function;
   i: number;
}) {
   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedDates = days;
      updatedDates[i] = e.target.value;
      setDays(updatedDates);
      setHasChanged(true);
   };

   return <>{<input type="date" value={days[serial]} onChange={(e) => handleDateChange(e)} />}</>;
}
