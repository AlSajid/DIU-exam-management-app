import Teacher from "@/db/models/teachers";
import deleteData from "@/db/utils/deleteData";
import getData from "@/db/utils/getData";
import postData from "@/db/utils/postData";
import putData from "@/db/utils/putData";

export const POST = async (request: Request) => {
	const body = await request.json();
	return await postData(Teacher, body, "Teacher Added Successfully");
};

export const PUT = async (request: Request) => {
	const {searchParams} = new URL(request.url);
	const id = searchParams.get("id") || "";

	const body = await request.json();
	return await putData(Teacher, {_id: id}, body, "Teacher Updated Successfully");
};

export const GET = async () => {
	return await getData(Teacher, null);
};

export const DELETE = async (request: Request) => {
	const {searchParams} = new URL(request.url);
	const id = searchParams.get("id") || "";

	return await deleteData(Teacher, id, "Teacher Deleted Successfully");
};
