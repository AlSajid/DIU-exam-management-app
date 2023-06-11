"use client"
import {useEffect, useState} from "react";
import AddClassroom from "./AddClassroom";
import ViewClassrooms from "./ViewClassrooms";
import Board from "@/components/Board";
import Tab from "@/components/Tab";

export default function Classrooms() {
	const [classrooms, setClassrooms] = useState();

	useEffect(() => {
		fetch(`/api/classrooms`)
			.then((response) => response.json())
			.then((data) => setClassrooms(data));
	}, []);

	return (
		<Board heading="Classrooms">
			<Tab
				header={["Classrooms", "Add Classroom"]}
				content={[<ViewClassrooms key={0} />, <AddClassroom key={1} />]}
			/>
		</Board>
	);
}
