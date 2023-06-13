"use client";
import deletionModal from "@/components/DeletionModal";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import {AllContexts} from "@/contexts/ContextProvider";
import delReqHandler from "@/utils/delReqHandler";
import {useRouter} from "next/navigation";
import {useContext} from "react";

export default function ViewClassrooms() {
	const {classrooms, getClassrooms}: any = useContext(AllContexts);
	const router = useRouter();

	const handleDelete = (id: string) => {
		async function del() {
			const url = `/api/classrooms?id=${id}`;
			const response = await delReqHandler(url);
			if (response === 200) {
				getClassrooms();
			}
		}
		deletionModal(del);
	};

	const handleEdit = (id: string) => {
		router.push(`/classrooms/${id}`);
	};

	return (
		<>
			{classrooms === undefined ? (
				<Loader msg="Fetching data" />
			) : (
				<Table
					name="Sections"
					data={classrooms}
					heads={["Room No", "Row No", "Number of Seats"]}
					fields={["room", "row", "seats"]}
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
}
