import Routine from "@/db/models/routine";
import getData from "@/db/utils/getData";
import putData from "@/db/utils/putData";
import {NextResponse} from "next/server";

export const GET = async () => {
   const data = await getData(Routine, null);
   return NextResponse.json(data);
};

export const PUT = async (request: Request) => {
   const body = await request.json();
   return await putData(Routine, {active: true}, body, "Routine Updated Successfully");
};
