import Course from "@/db/models/courses";
import deleteData from "@/db/utils/deleteData";
import getData from "@/db/utils/getData";
import postData from "@/db/utils/postData";
import putData from "@/db/utils/putData";

export const POST = async (request: Request) => {
	const body = await request.json();
	return await postData(Course, body, "Course Added Successfully");
};

export const GET = async () => {
	return await getData(Course, null);
};

export const PUT = async (request: Request) => {
	const {searchParams} = new URL(request.url);
	const id = searchParams.get("id") || "";

	const body = await request.json();
	return await putData(Course, {_id: id}, body, "Course Updated Successfully");
};

export const DELETE = async (request: Request) => {
	const {searchParams} = new URL(request.url);
	const id = searchParams.get("id") || "";

	return await deleteData(Course, id, "Course Deleted Successfully");
};
