import Board from "@/components/Board";
import AddTeachers from "./AddTeachers";
import ViewTeachers from "./ViewTeachers";
import Tab from "@/components/Tab";

export default function Page() {
	return (
		<Board heading="Teachers">
			<Tab
				header={["All Teachers", "Add Teacher"]}
				content={[<ViewTeachers key={0} />, <AddTeachers key={1}/>]}
			/>
		</Board>
	);
}




