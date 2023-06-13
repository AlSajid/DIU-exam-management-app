"use client";
import Board from "@/components/Board";
import Button from "@/components/Button";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import putReqHandler from "@/utils/putReqHandler";
import {useRouter} from "next/navigation";
import {useState, useRef, useContext, useEffect} from "react";
import {toast} from "react-hot-toast";

export default function Page({params}: any) {
	const {teachers, getTeachers}: any = useContext(AllContexts);
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const idRef: any = useRef();
	const nameRef: any = useRef();
	const designationRef: any = useRef();
	const departmentRef: any = useRef();
	const emailRef: any = useRef();
	const phoneRef: any = useRef();

	useEffect(() => {
		if (!teachers) return;

		const info = teachers.find((item: any) => item._id === params.id);

		idRef.current.value = info.employeeID;
		nameRef.current.value = info.name;
		designationRef.current.value = info.designation;
		departmentRef.current.value = info.department;
		emailRef.current.value = info.email;
		phoneRef.current.value = info.phone;
	}, [params.id, teachers]);

	const handleUpdate = async () => {
		if (nameRef.current.value === "") {
			toast.error("Name is required");
			nameRef.current.focus();
			return;
		}

		if (designationRef.current.value === "") {
			toast.error("Designation is required");
			designationRef.current.focus();
			return;
		}

		if (departmentRef.current.value === "") {
			toast.error("Department is required");
			departmentRef.current.focus();
			return;
		}

		if (emailRef.current.value === "") {
			toast.error("Email is required");
			emailRef.current.focus();
			return;
		}

		if (phoneRef.current.value === "") {
			toast.error("Phone is required");
			phoneRef.current.focus();
			return;
		}

		const data = {
			employeeID: parseInt(idRef.current.value),
			name: nameRef.current.value,
			designation: designationRef.current.value,
			department: departmentRef.current.value,
			email: emailRef.current.value,
			phone: phoneRef.current.value
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
						{label: "Employee ID", ref: idRef, type: "number"},
						{label: "Name", ref: nameRef, type: "text"},
						{label: "Designation", ref: designationRef, type: "text"},
						{label: "Department", ref: departmentRef, type: "text"},
						{label: "Email", ref: emailRef, type: "email"},
						{label: "Phone", ref: phoneRef, type: "text"}
					]}
				/>
				<div>{loading ? <Loader msg="Sending" /> : <Button action={handleUpdate}>Update</Button>}</div>
			</div>
		</Board>
	);
}
