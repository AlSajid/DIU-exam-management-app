import Input from "./Input";

export default function Form({input}: any) {
	return (
		<table>
			<tbody>
				{input.map((item: any, index: number) => (
					<Input
						input={item}
						key={index}
					/>
				))}
			</tbody>
		</table>
	);
}
