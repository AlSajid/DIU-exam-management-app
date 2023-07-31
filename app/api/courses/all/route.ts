import getData from "@/db/utils/getData";
import Course from "@/db/models/courses";
import {NextResponse} from "next/server";

export const GET = async () => {
   const courses = await getData(Course, null);
   return NextResponse.json(courses);
};
