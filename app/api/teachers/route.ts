import Teacher from "@/db/models/teachers";
import deleteData from "@/db/utils/deleteData";
import getData from "@/db/utils/getData";
import postData from "@/db/utils/postData";
import putData from "@/db/utils/putData";
import {NextResponse} from "next/server";

let teachers: any = null;

export const POST = async (request: Request) => {
   const body = await request.json();
   teachers = null;
   return await postData(Teacher, body, "Teacher Added Successfully");
};

export const PUT = async (request: Request) => {
   const {searchParams} = new URL(request.url);
   const id = searchParams.get("id") || "";

   const body = await request.json();
   teachers = null;
   return await putData(Teacher, {_id: id}, body, "Teacher Updated Successfully");
};

export const GET = async () => {
   if (teachers === null) teachers = await getData(Teacher, null);
   return NextResponse.json(teachers);
};

export const DELETE = async (request: Request) => {
   const {searchParams} = new URL(request.url);
   const id = searchParams.get("id") || "";

   teachers = null;
   return await deleteData(Teacher, {_id: id}, "Teacher Deleted Successfully");
};
