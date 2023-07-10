"use client";
import Button from "@/components/Button";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import {useContext, useEffect, useRef, useState} from "react";
import {alphabets} from "@/public/alphabets";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import putReqHandler from "@/utils/ReqHandler/putReqHandler";
import Board from "@/components/Board";

export default function Page({params}: any) {
   const {classrooms, getClassrooms}: any = useContext(AllContexts);
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const roomRef: any = useRef();
   const rowRef: any = useRef();
   const seatsRef: any = useRef();

   useEffect(() => {
      if (!classrooms) return;
      const info = classrooms.find((item: any) => item._id === params.id);

      roomRef.current.value = info.room;
      rowRef.current.value = info.row;
      seatsRef.current.value = info.seats;
   }, [classrooms, params.id]);

   const handleUpdate = async () => {
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
      const response = await putReqHandler(`/api/classrooms?id=${params.id}`, data);
      setLoading(false);

      if (response === 200) {
         getClassrooms();
         router.push(`/classrooms`);
      }
   };

   return (
      <Board heading="Update Classroom Information">
         <div className="my-7">
            <Form
               input={[
                  {
                     label: "Room No",
                     type: "text",
                     ref: roomRef
                  },
                  {
                     label: "Row No",
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
                  <Button action={handleUpdate}>Update Classroom</Button>
               )}
            </div>
         </div>
      </Board>
   );
}
