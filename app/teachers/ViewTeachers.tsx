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
            <Table
               name="Teachers"
               data={teachers}
               heads={["ID", "Name", "Designation", "Phone", "Email"]}
               fields={["employeeID", "name", "designation", "phone", "email"]}
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
};

export default ViewTeachers;
