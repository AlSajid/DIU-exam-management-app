"use client";
import Button from "@/components/Button";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import {useContext, useRef, useState} from "react";
import {alphabets} from "@/public/alphabets";
import {toast} from "react-hot-toast";
import postReqHandler from "@/utils/ReqHandler/postReqHandler";

export default function AddClassroom() {
   const [loading, setLoading] = useState(false);

   const {getClassrooms}: any = useContext(AllContexts);

   const roomRef: any = useRef();
   const rowRef: any = useRef();
   const seatsRef: any = useRef();

   const handleAddClassroom = async () => {
      if (roomRef?.current?.value === "") {
         toast.error("Room no is required");
         roomRef?.current?.focus();
         return;
      }

      if (rowRef?.current?.value === "") {
         toast.error("Row no is required");
         rowRef?.current?.focus();
         return;
      }

      if (seatsRef?.current?.value === "") {
         toast.error("Number of seats is required");
         seatsRef?.current?.focus();
         return;
      }

      const data = {
         room: roomRef.current.value,
         row: rowRef.current.value,
         seats: seatsRef.current.value
      };

      setLoading(true);
      const response = await postReqHandler(`/api/classrooms/`, data);
      if (response === 200) {
         getClassrooms();
         roomRef.current.value = "";
         rowRef.current.value = "";
         seatsRef.current.value = "";
      }
      setLoading(false);
   };

   return (
      <div className="my-7">
         <Form
            input={[
               {
                  label: "Room No",
                  type: "text",
                  ref: roomRef
               },
               {
                  label: "Column No",
                  type: "select",
                  options: alphabets,
                  ref: rowRef
               },
               {
                  label: "Number of Seats",
                  type: "number",
                  ref: seatsRef
               }
            ]}
         />

         <div>
            {loading ? (
               <Loader msg="Sending" />
            ) : (
               <Button action={handleAddClassroom}>Add Classroom</Button>
            )}
         </div>
      </div>
   );
}
