import connect from "@/db/connect";
import Section from "@/db/models/sections";
import errorHandler from "@/utils/errorHandler";
import {ObjectId} from "mongodb";
import {NextResponse} from "next/server";

export default async function getSections(id: string) {
   try {
      await connect();
      const sections = await Section.aggregate([
         {
            $match: {
               courseId: new ObjectId(id)
            }
         },
         {
            $lookup: {
               from: "courses",
               localField: "courseId",
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
               localField: "teacherId",
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
               teacherName: "$teacher.name"
            }
         },
         {
            $project: {
               course: 0,
               teacher: 0
            }
         },
         {
            $sort: {
               section: 1
            }
         }
      ]);

      return NextResponse.json(sections);
   } catch (error: any) {
      return errorHandler(error);
   }
}
