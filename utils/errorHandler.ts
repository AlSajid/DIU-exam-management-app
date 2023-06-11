export default function errorHandler(error: {code: number | string}) {
	console.log(error.code);
	console.log(error);
	switch (error.code) {
		case 11000:
			return "Duplicate Entry";
		case 404:
			return "Not Found";
		default:
			return "Something went wrong";
	}
}
