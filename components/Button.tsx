export default function Button({action, children}: {action: any; children: React.ReactNode}) {
	return (
		<div className="flex justify-center py-7">
			<button
				className="shadow bg-emerald-700 text-white font-semibold py-3 px-7 text-lg rounded"
				onClick={action}>
				{children}
			</button>
		</div>
	);
}
