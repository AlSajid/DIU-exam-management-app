"use client";
import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import {useContext, useEffect, useRef, useState} from "react";
import Form from "@/components/Form/Form";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import {toast} from "react-hot-toast";
import Board from "@/components/Board";
import putReqHandler from "@/utils/putReqHandler";
import {useRouter} from "next/navigation";

export default function AddSection({params}: any) {
   const {courses, teachers, getSections, sections}: any = useContext(AllContexts);
   const [loading, setLoading] = useState(false);
   const [course, setCourse] = useState("");
   const [teacherValue, setTeacherValue] = useState("");
   const [courseValue, setCourseValue] = useState("");
   const [teacher, setTeacher] = useState("");
   const sectionRef: any = useRef();
   const studentRef: any = useRef();

   const router = useRouter();

   useEffect(() => {
      if (sections === undefined || courses === undefined) return;
      const info = sections.find((item: any) => item._id === params.id);

      sectionRef.current.value = info.section;
      studentRef.current.value = info.students;

      setCourse(info.toCourseId);
      setCourseValue(info.courseTitle);

      setTeacher(info.teacherId);
      setTeacherValue(info.teacherName);
   }, [sections, params.id, courses]);

   const handleUpdate = async () => {
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
      const response = await putReqHandler(`/api/sections/?id=${params.id}`, data);

      if (response === 200) {
         getSections();
         router.push(`/sections`);
      }

      setLoading(false);
   };

   return (
      <Board heading="Update Section Information">
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
                     <Dropdown data={courses} setValue={setCourse} name="title" initValue={courseValue} />
                  </td>
               </tr>
               <tr>
                  <td>Course Teacher</td>
                  <td className="w-4/5">
                     <Dropdown data={teachers} setValue={setTeacher} name="name" initValue={teacherValue} />
                  </td>
               </tr>
            </Form>

            <div className="text-center p-3">{loading ? <Loader msg="Updating" /> : <Button action={handleUpdate}>Update</Button>}</div>
         </div>
      </Board>
   );
}
