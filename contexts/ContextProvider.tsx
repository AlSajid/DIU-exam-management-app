"use client";
import {createContext} from "react";
import useAuth from "./hooks/useAuth";
import useCourses from "./hooks/useCourses";
import useSections from "./hooks/useSections";
import useTeachers from "./hooks/useTeachers";
import useClassrooms from "./hooks/useClassrooms";

export const AllContexts = createContext(null);

export default function ContextProvider({children}: {children: React.ReactNode}) {
	// const authContext = useAuth();
	const teachersContext = useTeachers();
	const coursesContext = useCourses();
	const sectionsContext = useSections();
	const classroomsContext = useClassrooms();

	const allContexts: any = {
		// ...authContext,
		...teachersContext,
		...coursesContext,
		...sectionsContext,
		...classroomsContext
	};

	return <AllContexts.Provider value={allContexts}>{children}</AllContexts.Provider>;
}
