export default function Loader({msg}: {msg: string}) {
	return (
		<div className="my-7 flex flex-col">
			<div className="w-12 h-12 border-t-emerald-700 border-t-4 rounded-full mx-auto animate-spin my-3"></div>
			<h1 className="text-slate-500 text-center">{msg}...</h1>
		</div>
	);
}
