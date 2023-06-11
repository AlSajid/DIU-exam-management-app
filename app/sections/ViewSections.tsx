"use client";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import {AllContexts} from "@/contexts/ContextProvider";
import {useContext} from "react";

const ViewSections = () => {
	const {sections} = useContext(AllContexts);
	const handleDelete = async (id: string) => {
		console.log(id);
	};

	return (
		<>
			{sections === undefined ? (
				<Loader msg="Fetching data" />
			) : (
				<Table
					name="Sections"
					type="sections"
					data={sections}
					heads={["Semester", "Course", "Teacher", "Section", "Students"]}
					fields={["Semester", "Course", "Teacher", "Section", "Students"]}
					actions={[
						{
							name: "Delete",
							onClick: handleDelete
						}
					]}
				/>
			)}
		</>
	);
};

export default ViewSections;
