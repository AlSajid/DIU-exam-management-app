import connect from "@/db/connect";
import Section from "@/db/models/sections";
import errorHandler from "@/utils/errorHandler";
import {NextResponse} from "next/server";

export default async function getSections() {
   try {
      await connect();
      const courses = await Section.aggregate([
         {
            $lookup: {
               from: "courses",
               localField: "course",
               foreignField: "_id",
               as: "course"
            }
         },
         {
            $unwind: "$course"
         },
         {
            $lookup: {
               from: "teachers",
               localField: "teacher",
               foreignField: "_id",
               as: "teacher"
            }
         },
         {
            $unwind: "$teacher"
         },
         {
            $addFields: {
               courseCode: "$course.code",
               courseTitle: "$course.title",
               courseSemester: "$course.semester",
               courseShift: "$course.shift",
               teacherId: "$teacher._id",
               CourseId: "$course._id",
               teacherName: "$teacher.name"
            }
         },
         {
            $project: {
               course: 0,
               teacher: 0
            }
         }
      ]);

      return NextResponse.json(courses);
   } catch (error: any) {
      return errorHandler(error);
   }
}
