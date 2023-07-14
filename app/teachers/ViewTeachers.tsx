"use client";
import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import deletionModal from "@/components/DeletionModal";
import delReqHandler from "@/utils/ReqHandler/delReqHandler";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ToggleSwitch from "@/components/toggleSwitch";
import {Teacher} from "@/types/teachers";

const ViewTeachers = () => {
   const {teachers, getTeachers}: any = useContext(AllContexts);
   const [list, setList] = useState<Teacher[]>([]);
   const router = useRouter();

   useEffect(() => {
      if (teachers) setList(teachers);
   }, [teachers]);

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

   const handleSearch = (query: string) => {
      const result = teachers.filter((teacher: Teacher) => {
         const name = teacher.name.toLowerCase();
         const initial = teacher?.initial?.toLowerCase() || "";

         return (
            initial.includes(query.toLowerCase()) ||
            name.includes(query.toLowerCase()) || teacher.employeeID == query
         );
      });
      setList(result);
   };

   return (
      <>
         {teachers === undefined ? (
            <Loader msg="Fetching data" />
         ) : (
            <table>
               <thead>
                  <tr>
                     <td className="w-1/12">Employee ID</td>
                     <td className="w-1/12">Initial</td>
                     <td className="w-2/12">Name</td>
                     <td className="w-2/12">Designation</td>
                     <td className="w-2/12">Phone</td>
                     <td className="w-2/12">Email</td>
                     <td className="w-2/12">
                        <input
                           placeholder="Search"
                           onChange={(e) => handleSearch(e.target.value)}
                        />
                     </td>
                  </tr>
               </thead>
               <tbody>
                  {list.map((teacher: any, index: number) => (
                     <tr key={teacher._id} className="even:bg-slate-100">
                        <td key={index}>{teacher.employeeID}</td>
                        <td className="text-center">{teacher.initial}</td>
                        <td>
                           <a href={teacher.profile}>{teacher.name}</a>
                        </td>

                        <td>{teacher.designation}</td>

                        <td>
                           <a href={`tel:${teacher.phone}`}>{teacher.phone}</a>
                        </td>

                        <td>
                           <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
                        </td>

                        <td className="flex items-center justify-evenly relative z-0" colSpan={2}>
                           <ToggleSwitch state={true} />

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
