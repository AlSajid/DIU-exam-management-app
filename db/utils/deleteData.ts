import {NextResponse} from "next/server";
import connect from "../connect";
import errorHandler from "@/utils/errorHandler";

export default async function deleteData(model: any, id: object, successMessage: string) {
   try {
      await connect();
      const result = await model.deleteOne(id);

      if (result.acknowledged === true && result.deletedCount === 1) {
         return NextResponse.json({message: successMessage});
      }
   } catch (error: any) {
      return errorHandler(error);
   }
}
