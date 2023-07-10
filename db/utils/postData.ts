import connect from "@/db/connect";
import {NextResponse} from "next/server";
import errorHandler from "../../utils/errorHandler";

export default async function postData(model: any, data: object, successMessage: string) {
   try {
      await connect();
      await model.create(data);
      return NextResponse.json({message: successMessage});
   } catch (error: any) {
      return errorHandler(error);
   }
}
