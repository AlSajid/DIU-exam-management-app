import connect from "@/db/connect";
import errorHandler from "../../utils/errorHandler";
import {NextResponse} from "next/server";

export default async function getData(model: any) {
	try {
		await connect();
		const courses = await model.find();
		return NextResponse.json(courses);
	} catch (error: any) {
		return errorHandler(error);
	}
}
