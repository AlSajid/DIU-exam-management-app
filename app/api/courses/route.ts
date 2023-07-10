import Course from "@/db/models/courses";
import Section from "@/db/models/sections";
import deleteData from "@/db/utils/deleteData";
import getData from "@/db/utils/getData";
import postData from "@/db/utils/postData";
import putData from "@/db/utils/putData";
import { NextResponse } from "next/server";

let courses: any = null;

export const POST = async (request: Request) => {
   const body = await request.json();
   courses = null;
   return await postData(Course, body, "Course Added Successfully");
};

export const GET = async () => {
   if (courses === null) courses = await getData(Course, null);
   return NextResponse.json(courses);
};

export const PUT = async (request: Request) => {
   const {searchParams} = new URL(request.url);
   const id = searchParams.get("id") || "";

   const body = await request.json();
   courses = null;
   return await putData(Course, {_id: id}, body, "Course Updated Successfully");
};

export const DELETE = async (request: Request) => {
   const {searchParams} = new URL(request.url);
   const id = searchParams.get("id") || "";

   courses = null;
   await deleteData(Section, {course: id}, "Sections Deleted Successfully");
   return await deleteData(Course, {_id: id}, "Course Deleted Successfully");
};
