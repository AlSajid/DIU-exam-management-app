import {toast} from "react-hot-toast";

export default async function getHandler(url: string) {
	const response = await fetch(url);
	const res = await response.json();
    console.log(res)

	switch (response.status) {
		case 200:
			return res;
		case 500:
			toast.error(res.message);
			break;
	}
}
