import {useEffect, useState} from "react";

export default function useTeachers() {
   const [teachers, setTeachers] = useState();

   useEffect(() => {
      getTeachers();
   }, []);

   const getTeachers = () => {
      fetch(`/api/teachers`)
         .then((response) => response.json())
         .then((data) => setTeachers(data));
   };

   return {teachers, getTeachers};
}
