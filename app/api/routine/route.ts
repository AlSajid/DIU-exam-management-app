import Routine from "@/db/models/routine";
import getData from "@/db/utils/getData";
import postData from "@/db/utils/postData";
import putData from "@/db/utils/putData";

export const GET = async () => {
   return await getData(Routine, null);
};

export const PUT = async (request: Request) => {
   const body = await request.json();
   return await putData(Routine, {active: true}, body, "Routine Updated Successfully");
};
