"use client";
import deletionModal from "@/components/DeletionModal";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import {AllContexts} from "@/contexts/ContextProvider";
import delReqHandler from "@/utils/delReqHandler";
import {useRouter} from "next/navigation";
import {useContext} from "react";

const ViewSections = () => {
	const {sections, getSections}: any = useContext(AllContexts);
	const router = useRouter();

	const handleDelete = (id: string) => {
		async function del() {
			const url = `/api/sections?id=${id}`;
			const response = await delReqHandler(url);
			if (response === 200) {
				getSections();
			}
		}
		deletionModal(del);
	};

	const handleEdit = (id: string) => {
		router.push(`/sections/${id}`);
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
					heads={["Course code", "Course Title", "Course Teacher", "Section", "Students"]}
					fields={["courseCode", "courseTitle", "teacherName", "section", "students"]}
					actions={[
						{
							name: "Edit",
							onClick: handleEdit
						},
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
