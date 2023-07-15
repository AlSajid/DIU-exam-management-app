import getData from "@/db/utils/getData";
import Course from "@/db/models/courses";
import {NextResponse} from "next/server";

export const GET = async (request: Request, {params}: {params: {id: string}}) => {
   const id = params.id;
   const course = await getData(Course, {_id: id});
   return NextResponse.json(course[0]);
};
