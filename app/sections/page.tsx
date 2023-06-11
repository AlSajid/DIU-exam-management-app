import Board from "@/components/Board";
import AddSection from "./AddSection";
import ViewSections from "./ViewSections";
import Tab from "@/components/Tab";

export default function page() {
	return (
		<Board heading="Sections">
			<Tab
				header={["Sections", "Sections"]}
				content={[<ViewSections key={0} />, <AddSection key={1} />]}
			/>
		</Board>
	);
}
