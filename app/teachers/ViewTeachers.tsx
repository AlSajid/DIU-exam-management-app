"use client";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import {AllContexts} from "@/contexts/ContextProvider";
import deletionModal from "@/components/DeletionModal";
import delReqHandler from "@/utils/delReqHandler";
import {useContext} from "react";

const ViewTeachers = () => {
	const {teachers, getTeachers} = useContext(AllContexts);

	const handleDelete = (id: string) => {
		async function del() {
			const url = `/api/teachers?id=${id}`;
			const response = await delReqHandler(url);
			if (response === 200) {
				getTeachers();
			}
		}
		deletionModal(del);
	};

	return (
		<>
			{teachers === undefined ? (
				<Loader msg="Fetching data" />
			) : (
				<Table
					name="Teachers"
					type="teachers"
					data={teachers}
					heads={["Employee ID", "Name", "Designation", "Phone", "Email"]}
					fields={["employeeID", "name", "designation", "phone", "email"]}
					actions={[
						{
							name: "Edit",
							onClick: (id: string) => {
								console.log(id);
							}
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

export default ViewTeachers;
