import {useEffect, useState} from "react";

export default function useSections() {
   const [sections, setSections] = useState();

   const getSections = () => {
      fetch(`/api/sections`)
         .then((response) => response.json())
         .then((data) => setSections(data));
   };

   useEffect(() => {
      getSections();
   }, []);

   return {sections, getSections};
}
