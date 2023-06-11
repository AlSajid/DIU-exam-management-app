import connect from "@/db/connect";
import Teacher from "@/db/models/teachers";
import errorHandler from "@/utils/errorHandler";
import {NextResponse} from "next/server";

export const POST = async (request: Request) => {
	const body = await request.json();
	console.log(body);

	try {
		await connect();
		await Teacher.create(body);
		return NextResponse.json({message: "Teacher Added Successfully"});
	} catch (error: any) {
		const message = errorHandler(error);
		return NextResponse.json({message}, {status: 500});
	}
};

export const GET = async () => {
	try {
		await connect();
		const teachers = await Teacher.find();
		return NextResponse.json(teachers);
	} catch (error:any) {
		const message = errorHandler(error);
		return NextResponse.json({message}, {status: 500});
	}
};

export const DELETE = async (request: Request) => {
	const {searchParams} = new URL(request.url);
	const id = searchParams.get("id");

	try {
		await connect();
		const result = await Teacher.deleteOne({_id: id});

		if (result.acknowledged === true && result.deletedCount === 1) {
			return NextResponse.json({message: "Teacher Deleted Successfully"});
		}
	} catch (error: any) {
		const message = errorHandler(error);
		return NextResponse.json({message}, {status: 500});
	}
};
