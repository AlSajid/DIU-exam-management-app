export default function PlanController({planType, plan, setPlan}: {planType: string; plan: string[]; setPlan: Function}) {
	const handleChange = (change: string) => {
		switch (change) {
			case "decrement":
				setPlan(plan.slice(0, plan.length - 1));
				break;

			case "increment":
				setPlan([...plan, ""]);
				break;
		}
	};

	return (
		<div className="flex items-center">
			<span className="mx-3">{planType}</span>
			<button className="border p-3 rounded" onClick={() => handleChange("decrement")}>
				-
			</button>
			<div className="border py-3 px-5">{plan.length}</div>
			<button className="border p-3 rounded" onClick={() => handleChange("increment")}>
				+
			</button>
		</div>
	);
}
