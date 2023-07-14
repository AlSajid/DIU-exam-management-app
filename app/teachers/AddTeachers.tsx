"use client";
import Button from "@/components/Button";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import getReqHandler from "@/utils/ReqHandler/getReqHandler.";
import postReqHandler from "@/utils/ReqHandler/postReqHandler";
import resetForm from "@/utils/resetForm";
import validateForm from "@/utils/validateForm";
import {useState, useRef, useContext} from "react";
import {toast} from "react-hot-toast";

const AddTeachers = () => {
   const [loading, setLoading] = useState(false);
   const [fetching, setFetching] = useState(false);

   const {getTeachers}: any = useContext(AllContexts);

   const urlRef: any = useRef();
   const idRef: any = useRef();
   const nameRef: any = useRef();
   const designationRef: any = useRef();
   const departmentRef: any = useRef();
   const emailRef: any = useRef();
   const phoneRef: any = useRef();
   const initialRef: any = useRef();

   const handleFetchInfo = async () => {
      if (validateForm([{input: urlRef, label: "URL"}])) return;

      const urlPattern = /^https:\/\/faculty\.daffodilvarsity\.edu\.bd\/profile\/.*$/;
      if (!urlPattern.test(urlRef.current.value)) {
         toast.error("Please enter a valid URL");
         return;
      }

      setFetching(true);
      const response: any = await getReqHandler(`/api/teachers/fetch?url=${urlRef.current.value}`);
      setFetching(false);

      if (response === 404) {
         toast.error("No teacher found");
         return;
      }

      if (response) {
         idRef.current.value = response.employeeID;
         nameRef.current.value = response.name;
         designationRef.current.value = response.designation;
         departmentRef.current.value = response.department;
         emailRef.current.value = response.email;
         phoneRef.current.value = response.phone;
      }
   };

   const handleAddTeacher = async () => {
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
         profile: urlRef.current.value,
         employeeID: idRef.current.value,
         name: nameRef.current.value,
         designation: designationRef.current.value,
         department: departmentRef.current.value,
         email: emailRef.current.value,
         phone: phoneRef.current.value,
         initial: initialRef.current.value
      };
      setLoading(true);
      const response = await postReqHandler(`/api/teachers/`, data);
      setLoading(false);

      if (response === 200) {
         getTeachers();
         resetForm([
            urlRef,
            idRef,
            nameRef,
            designationRef,
            departmentRef,
            emailRef,
            phoneRef,
            initialRef
         ]);
      }
   };

   return (
      <div className="my-7">
         <div className="flex">
            <input
               type="text"
               ref={urlRef}
               placeholder="https://faculty.daffodilvarsity.edu.bd/profile/cse/touhid.html"
            />
            {!fetching && <button onClick={handleFetchInfo}>Fetch</button>}
         </div>

         <div>
            <Form
               input={[
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
               {loading ? (
                  <Loader msg="Sending" />
               ) : (
                  <Button action={handleAddTeacher}>Add Teacher</Button>
               )}
            </div>
         </div>
      </div>
   );
};

export default AddTeachers;
