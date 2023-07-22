"use client";
import Button from "@/components/Button";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import {useRef, useState, useContext} from "react";
import {semesters} from "@/public/config";
import postReqHandler from "@/utils/ReqHandler/postReqHandler";
import {AllContexts} from "@/contexts/ContextProvider";
import validateForm from "@/utils/validateForm";
import resetForm from "@/utils/resetForm";

export default function AddCourses() {
   const [loading, setLoading] = useState(false);
   const {getCourses}: any = useContext(AllContexts);

   const codeRef: any = useRef();
   const titleRef: any = useRef();
   const semesterRef: any = useRef();
   const batchRef: any = useRef();
   const shiftRef: any = useRef();

   const handleAddCourse = async () => {
      const refs = [
         {input: codeRef, label: "Course Code"},
         {input: titleRef, label: "Course Title"},
         {input: semesterRef, label: "Semester"},
         {input: batchRef, label: "Batch"},
         {input: shiftRef, label: "Shift"}
      ];

      if (validateForm(refs)) return;

      const data = {
         code: codeRef.current.value,
         title: titleRef.current.value,
         semester: semesterRef.current.value,
         batch: batchRef.current.value,
         shift: shiftRef.current.value
      };

      setLoading(true);
      const response = await postReqHandler(`/api/courses/`, data);
      if (response === 200) {
         getCourses();
         resetForm([codeRef, titleRef, semesterRef, batchRef, shiftRef]);
      }
      setLoading(false);
   };

   return (
      <div className="my-7">
         <Form
            input={[
               {
                  label: "Course Code",
                  ref: codeRef,
                  type: "text",
                  onChange: (e: any) => (e.target.value = e.target.value.toUpperCase())
               },
               {label: "Course Title", ref: titleRef, type: "text"},
               {label: "Semester", ref: semesterRef, type: "select", options: semesters},
               {label: "Batch", ref: batchRef, type: "text"},
               {
                  label: "Shift",
                  ref: shiftRef,
                  type: "select",
                  options: [
                     {name: "Morning", value: "Morning"},
                     {name: "Evening", value: "Evening"}
                  ]
               }
            ]}
         />

         <div>
            {loading ? (
               <Loader msg="Sending" />
            ) : (
               <Button action={handleAddCourse}>Add Course</Button>
            )}
         </div>
      </div>
   );
}
