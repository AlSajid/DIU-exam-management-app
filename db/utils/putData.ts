import connect from "@/db/connect";
import {NextResponse} from "next/server";
import errorHandler from "../../utils/errorHandler";
import {ObjectId} from "mongodb";

export default async function putData(model: any, filter: any, data: object, successMessage: string) {
	try {
		await connect();
		const result = await model.findOneAndUpdate(filter, data);
		console.log(result);
		
		return NextResponse.json({message: successMessage});
	} catch (error: any) {
		return errorHandler(error);
	}
}
