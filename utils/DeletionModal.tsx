import {toast} from "react-hot-toast";

export default function deletionModal(del: any) {
	toast((t) => (
		<div className="flex flex-col">
			<span className="text-lg my-3">Are you sure you want to delete it?</span>

			<div className="flex justify-around">
				<button
					className="bg-red-700 py-1 px-3"
					onClick={() => {
						del(t);
						toast.dismiss(t.id);
					}}>
					Delete
				</button>
				<button
					className="bg-slate-100 text-slate-700 py-1 px-3"
					onClick={() => toast.dismiss(t.id)}>
					Dismiss
				</button>
			</div>
		</div>
	));
}
