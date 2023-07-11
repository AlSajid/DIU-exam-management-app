import connect from "@/db/connect";
import Course from "@/db/models/courses";
import errorHandler from "@/utils/errorHandler";

export default async function getCourses() {
   try {
      await connect();

      const courses = Course.aggregate([
         {
            $lookup: {
               from: "sections",
               localField: "_id",
               foreignField: "course",
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
               students: {
                  $sum: "$sections.students"
               }
            }
         }
      ]);

      console.log("kaj hocche");

      return courses;
   } catch (error: any) {
      return errorHandler(error);
   }
}
