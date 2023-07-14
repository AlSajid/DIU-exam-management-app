import React, {useState} from "react";

const ToggleSwitch = ({state}: {state: boolean}) => {
   const [checked, setChecked] = useState<boolean>(state);

   const handleToggle = () => {
      setChecked((prevState) => !prevState);
   };

   return (
      <label className="relative inline-block w-14 h-8 cursor-pointer">
         <input
            type="checkbox"
            className="absolute h-0 w-0 opacity-0"
            checked={checked}
            onChange={handleToggle}
         />
         <span
            className={
               "toggle-slider absolute z-0 top-0 left-0 rounded-full w-14 h-8 transition " +
               (checked ? "bg-emerald-700" : "bg-gray-300")
            }></span>
         <span
            className="toggle-slider-handle z-0 bg-white absolute top-1 left-1 rounded-full w-6 h-6 transition"
            style={{transform: checked ? "translateX(100%)" : "translateX(0)"}}></span>
      </label>
   );
};

export default ToggleSwitch;
