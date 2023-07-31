"use client";

import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import deletionModal from "@/components/DeletionModal";
import delReqHandler from "@/utils/ReqHandler/delReqHandler";
import {useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import {shifts} from "@/public/config";
import Link from "next/link";

export default function ViewCourses() {
   const {courses, getCourses}: any = useContext(AllContexts);
   const router = useRouter();

   const handleDelete = (id: string) => {
      async function del() {
         const url = `/api/courses?id=${id}`;
         const response = await delReqHandler(url);
         if (response === 200) {
            getCourses();
         }
      }
      deletionModal(del);
   };

   const handleEdit = (id: string) => {
      router.push(`/courses/edit/${id}`);
   };

   return (
      <>
         {courses === undefined ? (
            <Loader msg="Fetching data" />
         ) : (
            <table>
               <thead>
                  <tr>
                     <td className="w-1/12">Shift</td>
                     <td className="w-1/12">Semester</td>
                     <td className="w-1/12">Batch</td>
                     <td className="w-1/12">Code</td>
                     <td className="w-4/12">Title</td>
                     <td className="w-1/12">Students</td>
                     <td className="w-1/12">Actions</td>
                  </tr>
               </thead>
               <tbody>
                  {courses.map((shift: any, shiftIndex: number) =>
                     shift.semesters.map((courses: any, courseIndex: number) =>
                        courses.map((course: any, index: number) => (
                           <tr key={index} className="even:bg-slate-100">
                              {courseIndex === 0 && index === 0 && (
                                 <td
                                    className="bg-white"
                                    key={index}
                                    rowSpan={shift.semesters.flat().length}>
                                    {course.shift}
                                 </td>
                              )}

                              {index === 0 && (
                                 <td className="bg-white" rowSpan={courses.length}>
                                    {course.semester}
                                 </td>
                              )}
                              <td className="text-center">{course.batch}</td>
                              <td className="text-center">{course.code}</td>

                              <td>
                                 <Link href={`/courses/sections/${course._id}`}>
                                    {course.title}
                                 </Link>
                              </td>

                              <td className="text-center">{course.students}</td>
                              <td>
                                 <button
                                    className="actionButton"
                                    onClick={() => handleEdit(course._id)}>
                                    Edit
                                 </button>
                                 <button
                                    className="actionButton"
                                    onClick={() => handleDelete(course._id)}>
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))
                     )
                  )}
               </tbody>
            </table>
         )}
      </>
   );
}
