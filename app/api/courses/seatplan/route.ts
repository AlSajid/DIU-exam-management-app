import connect from "@/db/connect";
import Course from "@/db/models/courses";
import errorHandler from "@/utils/errorHandler";

export default async function GET() {
   try {
      await connect();

      const courses = Course.aggregate([
         {
            $lookup: {
               from: "sections",
               localField: "_id",
               foreignField: "courseId",
               as: "sections"
            }
         },
         {
            $project: {
               _id: 1,
               code: 1,
               title: 1,
               semester: 1,
               batch: 1,
               shift: 1,
               students: {$sum: "$sections.students"}
            }
         },
         {
            $group: {
               _id: {
                  shift: "$shift",
                  semester: "$semester"
               },
               courses: {$push: "$$ROOT"}
            }
         },
         {
            $sort: {
               // "_id.shift": 1,
               "_id.semester": 1
            }
         },
         {
            $group: {
               _id: "$_id.shift",
               semesters: {$push: "$courses"}
            }
         },
         {
            $project: {
               _id: 0,
               shiftName: "$_id",
               semesters: 1
            }
         }
      ]);

      return courses;
   } catch (error) {
      // return errorHandler(error);
   }
}
