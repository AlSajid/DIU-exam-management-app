import AddClassroom from "./AddClassroom";
import ViewClassrooms from "./ViewClassrooms";
import Board from "@/components/Board";
import Tab from "@/components/Tab";

export default function Classrooms() {
	return (
		<Board heading="Classrooms">
			<Tab
				header={["Classrooms", "Add Classroom"]}
				content={[<ViewClassrooms key={0} />, <AddClassroom key={1} />]}
			/>
		</Board>
	);
}
