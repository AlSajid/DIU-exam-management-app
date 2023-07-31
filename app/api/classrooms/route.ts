import {NextResponse} from "next/server";
import Classroom from "@/db/models/classrooms";
import deleteData from "@/db/utils/deleteData";
import getData from "@/db/utils/getData";
import postData from "@/db/utils/postData";
import putData from "@/db/utils/putData";
import connect from "@/db/connect";

let classrooms: any = null;

export const POST = async (request: Request) => {
   const body = await request.json();
   classrooms = null;
   return await postData(Classroom, body, "Room Added Successfully");
};

export const GET = async () => {
   try {
      if (classrooms === null) {
         await connect();
         classrooms = await Classroom.aggregate([{$sort: {room: 1, row: 1}}]);
      }
      return NextResponse.json(classrooms);
   } catch (error) {
      console.error("Error occurred:", error);
      return NextResponse.json({error: "Something went wrong"}, {status: 500});
   }
};

export const PUT = async (request: Request) => {
   const {searchParams} = new URL(request.url);
   const id = searchParams.get("id") || "";

   const body = await request.json();
   classrooms = null;
   return await putData(Classroom, {_id: id}, body, "Room Updated Successfully");
};

export const DELETE = async (request: Request) => {
   const {searchParams} = new URL(request.url);
   const id = searchParams.get("id") || "";

   classrooms = null;
   return await deleteData(Classroom, {_id: id}, "Room Deleted Successfully");
};
