"use client";

import deletionModal from "@/components/DeletionModal";
import Loader from "@/components/Loader";
import delReqHandler from "@/utils/ReqHandler/delReqHandler";
import {useRouter} from "next/navigation";

const ViewSections = ({sections, getSections}: any) => {
   const router = useRouter();

   const handleDelete = (id: string) => {
      async function del() {
         const url = `/api/sections?id=${id}`;
         const response = await delReqHandler(url);
         if (response === 200) {
            getSections();
         }
      }
      deletionModal(del);
   };

   const handleEdit = (id: string) => {
      router.push(`courses/sections/edit/${id}`);
   };

   return (
      <>
         {sections === null ? (
            <Loader msg="Fetching data" />
         ) : (
            <table>
               <thead>
                  <tr>
                     <th>Course code</th>
                     <th>Course Title</th>
                     <th>Course Teacher</th>
                     <th>Section</th>
                     <th>Students</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {sections.map((section: any) => (
                     <tr key={section._id}>
                        <td>{section.courseCode}</td>
                        <td>{section.courseTitle}</td>
                        <td>{section.teacherName}</td>
                        <td className="text-center">{section.section}</td>
                        <td className="text-center">{section.students}</td>
                        <td className="text-center">
                           <button className="actionButton" onClick={() => handleEdit(section._id)}>
                              Edit
                           </button>

                           <button
                              className="actionButton"
                              onClick={() => handleDelete(section._id)}>
                              Delete
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </>
   );
};

export default ViewSections;
