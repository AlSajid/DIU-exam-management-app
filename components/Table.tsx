export default function Table({data, heads, fields, actions}: any) {
	return (
		<div className="h-[700px] overflow-y-scroll">
			{data.length === 0 ? (
				<h1 className="text-center text-slate-500 text-xl my-5">No data found</h1>
			) : (
				<table>
					<thead className="sticky top-0 shadow">
						<tr>
							{heads.map((head: String, index: number) => (
								<td key={index}>{head}</td>
							))}
							<td>Actions</td>
						</tr>
					</thead>
					<tbody>
						{data.map((data: any, index: number) => (
							<tr
								key={data._id}
								className="even:bg-slate-100 text-center">
								{fields?.map((field: string, index: number) => (
									<td key={index}>{data[field]}</td>
								))}
								<td className="flex justify-around items-center ">
									{actions.map((action: any, index: number) => (
										<button
											className="bg-transparent px-1 font-bold text-black hover:text-red-700"
											key={index}
											onClick={() => action.onClick(data._id)}>
											{action.name}
										</button>
									))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
