import {toast} from "react-hot-toast";

export default async function delReqHandler(url: string) {
	const response = await fetch(url, {
		method: "DELETE"
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
