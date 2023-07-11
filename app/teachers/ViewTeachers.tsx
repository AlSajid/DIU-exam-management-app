"use client";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import {AllContexts} from "@/contexts/ContextProvider";
import deletionModal from "@/components/DeletionModal";
import delReqHandler from "@/utils/ReqHandler/delReqHandler";
import {useContext} from "react";
import {useRouter} from "next/navigation";

const ViewTeachers = () => {
   const {teachers, getTeachers}: any = useContext(AllContexts);
   const router = useRouter();

   const handleDelete = (id: string) => {
      async function del() {
         const url = `/api/teachers?id=${id}`;
         const response = await delReqHandler(url);
         if (response === 200) {
            getTeachers();
         }
      }
      deletionModal(del);
   };

   const handleEdit = (id: string) => {
      router.push(`/teachers/${id}`);
   };

   return (
      <>
         {teachers === undefined ? (
            <Loader msg="Fetching data" />
         ) : (
            <table>
               <thead className="sticky top-0 shadow">
                  <tr>
                     <td>Employee ID</td>
                     <td>Name</td>
                     <td>Designation</td>
                     <td>Phone</td>
                     <td>Email</td>
                     <td>Actions</td>
                  </tr>
               </thead>
               <tbody>
                  {teachers.map((teacher: any, index: number) => (
                     <tr key={teacher._id} className="text-center even:bg-slate-100">
                        <td key={index}>{teacher.employeeID}</td>
                        <td className="text-left">{teacher.name}</td>
                        <td>{teacher.designation}</td>
                        <td>
                           <a href={`tel:${teacher.phone}`}>{teacher.phone}</a>
                        </td>
                        <td>{teacher.email}</td>
                        <td className="flex justify-around items-center">
                           <button
                              className="bg-transparent px-1 font-bold text-black hover:text-red-700"
                              onClick={() => handleEdit(teacher._id)}>
                              Edit
                           </button>
                           <button
                              className="bg-transparent px-1 font-bold text-black hover:text-red-700"
                              onClick={() => handleDelete(teacher._id)}>
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

export default ViewTeachers;
