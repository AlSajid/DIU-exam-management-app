"use client";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import {AllContexts} from "@/contexts/ContextProvider";
import deletionModal from "@/components/DeletionModal";
import delReqHandler from "@/utils/ReqHandler/delReqHandler";
import {useContext} from "react";
import {useRouter} from "next/navigation";

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
      router.push(`/courses/${id}`);
   };

   return (
      <>
         {courses === undefined ? (
            <Loader msg="Fetching data" />
         ) : (
            <Table
               name="Courses"
               data={courses}
               heads={["Code", "Title", "Semester", "Batch", "Shift"]}
               fields={["code", "title", "semester", "batch", "shift"]}
               actions={[
                  {
                     name: "Edit",
                     onClick: handleEdit
                  },
                  {
                     name: "Delete",
                     onClick: handleDelete
                  }
               ]}
            />
         )}
      </>
   );
}
