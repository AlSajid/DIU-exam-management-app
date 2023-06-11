"use client";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import {AllContexts} from "@/contexts/ContextProvider";
import deletionModal from "@/utils/DeletionModal";
import DeletionModal from "@/utils/DeletionModal";
import delReqHandler from "@/utils/delReqHandler";
import {useContext} from "react";
import {toast} from "react-hot-toast";

export default function ViewAllCourses() {
	const {courses, getCourses} = useContext(AllContexts);

	const handleDelete = (id: string) => {
		async function del() {
			const url = `/api/courses?id=${id}`;
			const response = await delReqHandler(url);
			if (response === 200) {
				getCourses();
			}
		}
		deletionModal(del);
	};

	return (
		<>
			{courses === undefined ? (
				<Loader msg="Fetching data" />
			) : (
				<Table
					name="Courses"
					data={courses}
					type="courses"
					heads={["Code", "Title", "Semester", "Shift"]}
					fields={["code", "title", "semester", "shift"]}
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
}
