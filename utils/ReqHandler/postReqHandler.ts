import {toast} from "react-hot-toast";

export default async function postReqHandler(url: string, data: any) {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});

	const res = await response.json();

	switch (response.status) {
		case 200:
			toast.success(res.message);
			break;
		case 500:
			toast.error(res.message);
			break;
	}

	return response.status;
}
