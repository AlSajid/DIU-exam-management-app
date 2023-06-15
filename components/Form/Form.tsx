import Input from "./Input";

export default function Form({input, children}: any) {
	return (
		<table>
			<tbody>
				{children}
				{input.map((item: any, index: number) => (
					<Input input={item} key={index} />
				))}
			</tbody>
		</table>
	);
}
