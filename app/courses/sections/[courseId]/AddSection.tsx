"use client";

import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import {useContext, useEffect, useRef, useState} from "react";
import Form from "@/components/Form/Form";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import {toast} from "react-hot-toast";
import postReqHandler from "@/utils/ReqHandler/postReqHandler";
import validateForm from "@/utils/validateForm";
import {Course} from "@/types/course";

export default function AddSection({
   courseId,
   getSections
}: {
   courseId: string;
   getSections: Function;
}) {
   const {teachers}: any = useContext(AllContexts);
   const [loading, setLoading] = useState(false);
   const [teacher, setTeacher] = useState("");
   const [courseInfo, setCourseInfo] = useState<Course>();
   const sectionRef: any = useRef();
   const studentRef: any = useRef();

   useEffect(() => {
      fetch(`/api/courses/${courseId}`)
         .then(res => res.json())
         .then(data => {
            setCourseInfo(data);
         })
         .catch(err => {
            toast.error("Something went wrong!");
            console.log(err);
         });
   }, [courseId]);

   const handleAddSection = async () => {
      const refs = [
         {input: sectionRef, label: "Section Name"},
         {input: studentRef, label: "Number of Students"}
      ];

      if (validateForm(refs)) return;

      if (courseId === "") {
         toast.error("Course teacher is required");
         return;
      }

      if (teacher === "") {
         toast.error("Course teacher is required");
         return;
      }

      const data = {
         courseId: courseId,
         teacherId: teacher,
         section: sectionRef.current.value,
         students: studentRef.current.value
      };

      setLoading(true);
      const response = await postReqHandler(`/api/sections/`, data);
      if (response === 200) {
         getSections();
         sectionRef.current.value = "";
         studentRef.current.value = "";
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
                  <input defaultValue={courseInfo?.title} readOnly />
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
