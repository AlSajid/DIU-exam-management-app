import Tab from "@/components/Tab";
import ViewCourses from "./ViewCourses";
import AddCourses from "./AddCourses";
import Board from "@/components/Board";

export default function Page() {
	return (
		<Board heading="Courses">
			<Tab
				header={["All Courses", "Add Course"]}
				content={[<ViewCourses key={0} />, <AddCourses key={1} />]}
			/>
		</Board>
	);
}
