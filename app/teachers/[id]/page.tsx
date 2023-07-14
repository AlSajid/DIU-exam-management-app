"use client";
import Board from "@/components/Board";
import Button from "@/components/Button";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import putReqHandler from "@/utils/ReqHandler/putReqHandler";
import validateForm from "@/utils/validateForm";
import {init} from "next/dist/compiled/@vercel/og/satori";
import {useRouter} from "next/navigation";
import {useState, useRef, useContext, useEffect} from "react";
import {toast} from "react-hot-toast";

export default function Page({params}: any) {
   const {teachers, getTeachers}: any = useContext(AllContexts);
   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const url: any = useRef();
   const idRef: any = useRef();
   const nameRef: any = useRef();
   const designationRef: any = useRef();
   const departmentRef: any = useRef();
   const emailRef: any = useRef();
   const phoneRef: any = useRef();
   const initialRef: any = useRef();

   useEffect(() => {
      if (!teachers) return;

      const info = teachers.find((item: any) => item._id === params.id);

      url.current.value = info.profile;
      idRef.current.value = info.employeeID;
      nameRef.current.value = info.name;
      designationRef.current.value = info.designation;
      departmentRef.current.value = info.department;
      emailRef.current.value = info.email;
      phoneRef.current.value = info.phone;
      initialRef.current.value = info.initial;
   }, [params.id, teachers]);

   const handleUpdate = async () => {
      const refs = [
         {input: idRef, label: "Employee ID"},
         {input: nameRef, label: "Name"},
         {input: designationRef, label: "Designation"},
         {input: departmentRef, label: "Department"},
         {input: emailRef, label: "Email"},
         {input: phoneRef, label: "Phone"},
         {input: initialRef, label: "Initial"}
      ];

      if (validateForm(refs)) return;

      const data = {
         profile: url.current.value,
         employeeID: parseInt(idRef.current.value),
         name: nameRef.current.value,
         designation: designationRef.current.value,
         department: departmentRef.current.value,
         email: emailRef.current.value,
         phone: phoneRef.current.value,
         initial: initialRef.current.value
      };
      setLoading(true);
      const response = await putReqHandler(`/api/teachers/?id=${params.id}`, data);
      setLoading(false);

      if (response === 200) {
         getTeachers();
         router.push(`/teachers`);
      }
   };

   return (
      <Board heading="Update Teachers Information">
         <div className="my-7">
            <Form
               input={[
                  {label: "Profile", ref: url, type: "text"},
                  {label: "Employee ID", ref: idRef, type: "number"},
                  {label: "Name", ref: nameRef, type: "text"},
                  {label: "Designation", ref: designationRef, type: "text"},
                  {label: "Department", ref: departmentRef, type: "text"},
                  {label: "Email", ref: emailRef, type: "email"},
                  {label: "Phone", ref: phoneRef, type: "text"},
                  {label: "Initial", ref: initialRef, type: "text"}
               ]}
            />
            <div>
               {loading ? <Loader msg="Sending" /> : <Button action={handleUpdate}>Update</Button>}
            </div>
         </div>
      </Board>
   );
}
