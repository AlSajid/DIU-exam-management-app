import Classroom from "@/db/models/classrooms";
import deleteData from "@/db/utils/deleteData";
import getData from "@/db/utils/getData";
import postData from "@/db/utils/postData";
import putData from "@/db/utils/putData";

export const POST = async (request: Request) => {
	const body = await request.json();
	return await postData(Classroom, body, "Room Added Successfully");
};

export const GET = async () => {
	return await getData(Classroom, null);
};

export const PUT = async (request: Request) => {
	const {searchParams} = new URL(request.url);
	const id = searchParams.get("id") || "";

	const body = await request.json();
	return await putData(Classroom, {_id: id}, body, "Room Updated Successfully");
};

export const DELETE = async (request: Request) => {
	const {searchParams} = new URL(request.url);
	const id = searchParams.get("id") || "";

	return await deleteData(Classroom, id, "Room Deleted Successfully");
};
