import connect from "@/db/connect";
import errorHandler from "../../utils/errorHandler";

export default async function getData(model: any, filter: any) {
   try {
      await connect();
      return await model.find(filter);
   } catch (error: any) {
      return errorHandler(error);
   }
}
