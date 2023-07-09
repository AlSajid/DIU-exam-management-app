"use client";
import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import {useContext, useRef, useState} from "react";
import Form from "@/components/Form/Form";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import {toast} from "react-hot-toast";
import postReqHandler from "@/utils/postReqHandler";

export default function AddSection() {
   const {courses, teachers, getSections}: any = useContext(AllContexts);
   const [loading, setLoading] = useState(false);
   const [course, setCourse] = useState("");
   const [teacher, setTeacher] = useState("");
   const sectionRef: any = useRef();
   const studentRef: any = useRef();

   const handleAddSection = async () => {
      if (course === "") {
         toast.error("Course Name is required");
         return;
      }

      if (teacher === "") {
         toast.error("Course teacher is required");
         return;
      }

      if (sectionRef.current.value === "") {
         toast.error("Section name is required");
         sectionRef.current.focus();
         return;
      }

      if (studentRef.current.value === "") {
         toast.error("Student no is required");
         studentRef.current.focus();
         return;
      }

      const data = {
         course,
         teacher,
         section: sectionRef.current.value,
         students: studentRef.current.value
      };

      setLoading(true);
      const response = await postReqHandler(`/api/sections/`, data);
      if (response === 200) {
         getSections();
         sectionRef.current.value = "";
         studentRef.current.value = "";
         setCourse("");
         setTeacher("");
      }

      setLoading(false);
   };

   return (
      <div className="my-7">
         <Form
            input={[
               {
                  label: "Section Name",
                  type: "text",
                  ref: sectionRef
               },
               {
                  label: "Number of Students",
                  type: "number",
                  ref: studentRef
               }
            ]}>
            <tr>
               <td>Course Name</td>
               <td className="w-4/5">
                  <Dropdown data={courses} initValue="" setValue={setCourse} name="title" />
               </td>
            </tr>
            <tr>
               <td>Course Teacher</td>
               <td className="w-4/5">
                  <Dropdown data={teachers} initValue="" setValue={setTeacher} name="name" />
               </td>
            </tr>
         </Form>

         <div className="text-center p-3">
            {loading ? (
               <Loader msg="Sending Information to the Server" />
            ) : (
               <Button action={handleAddSection}>Add Section</Button>
            )}
         </div>
      </div>
   );
}
