"use client";
import {createContext} from "react";
// import useAuth from "./hooks/useAuth";
import useCourses from "./hooks/useCourses";
import useTeachers from "./hooks/useTeachers";
import useClassrooms from "./hooks/useClassrooms";

export const AllContexts = createContext(null);

export default function ContextProvider({children}: {children: React.ReactNode}) {
   // const authContext = useAuth();
   const teachersContext = useTeachers();
   const coursesContext = useCourses();
   const classroomsContext = useClassrooms();

   const allContexts: any = {
      // ...authContext,
      ...teachersContext,
      ...coursesContext,
      ...classroomsContext
   };

   return <AllContexts.Provider value={allContexts}>{children}</AllContexts.Provider>;
}
