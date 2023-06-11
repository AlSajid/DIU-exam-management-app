import connect from "@/db/connect";
import Course from "@/db/models/courses";
import errorHandler from "@/utils/errorHandler";
import {NextResponse} from "next/server";

export const POST = async (request: Request) => {
	const body = await request.json();

	try {
		await connect();
		await Course.create(body);
		return NextResponse.json({message: "Course Added Successfully"});
	} catch (error: any) {
		const message = errorHandler(error);
		return NextResponse.json({message}, {status: 500});
	}
};

export const GET = async () => {
	try {
		await connect();
		const courses = await Course.find();
		return NextResponse.json(courses);
	} catch (error: any) {
		const message = errorHandler(error);
		return NextResponse.json({message}, {status: 500});
	}
};

export const DELETE = async (request: Request) => {
	const {searchParams} = new URL(request.url);
	const id = searchParams.get("id");

	try {
		await connect();
		const result = await Course.deleteOne({_id: id});

		if (result.acknowledged === true && result.deletedCount === 1) {
			return NextResponse.json({message: "Course Deleted Successfully"});
		}
	} catch (error: any) {
		const message = errorHandler(error);
		return NextResponse.json({message}, {status: 500});
	}
};
