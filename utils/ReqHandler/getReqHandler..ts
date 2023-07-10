import {toast} from "react-hot-toast";

export default async function getReqHandler(url: string) {
	const response = await fetch(url);
	const res = await response.json();

	switch (response.status) {
		case 200:
			return res;
		case 500:
			toast.error(res.message);
			break;
	}
}
