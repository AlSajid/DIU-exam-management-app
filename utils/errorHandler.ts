import {NextResponse} from "next/server";

export default function errorHandler(error: {code: number | string}) {
	console.log(error.code);
	console.log(error);

	let message = "Something went wrong";

	switch (error.code) {
		case 11000:
			message = "Duplicate Entry";
		case 404:
			message = "Not Found";
	}

	return NextResponse.json({message}, {status: 500});
}
