"use client";
import Button from "@/components/Button";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import getHandler from "@/utils/getReqHandler.";
import postReqHandler from "@/utils/postReqHandler";
import {useState, useRef, useContext} from "react";
import {toast} from "react-hot-toast";

const AddTeachers = () => {
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(false);

	const {getTeachers} = useContext(AllContexts);

	const url: any = useRef();
	const idRef: any = useRef();
	const nameRef: any = useRef();
	const designationRef: any = useRef();
	const departmentRef: any = useRef();
	const emailRef: any = useRef();
	const phoneRef: any = useRef();

	const handleFetchInfo = async () => {
		if (url.current.value === "") {
			toast.error("Please enter a URL");
			return;
		}
		const urlPattern = /^https:\/\/faculty\.daffodilvarsity\.edu\.bd\/profile\/.*$/;
		if (!urlPattern.test(url.current.value)) {
			toast.error("Please enter a valid URL");
			return;
		}

		setFetching(true);
		const response: any = await getHandler(`/api/teachers/fetch?url=${url.current.value}`);
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
		if (idRef.current.value === "") {
			toast.error("Employee ID is required");
			idRef.current.focus();
			return;
		}

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
		const response = await postReqHandler(`/api/teachers/`, data);
		setLoading(false);

		if (response === 200) {
			getTeachers();
			idRef.current.value = "";
			nameRef.current.value = "";
			designationRef.current.value = "";
			departmentRef.current.value = "";
			emailRef.current.value = "";
			phoneRef.current.value = "";
		}
	};

	return (
		<div className="my-7">
			{fetching ? (
				<Loader msg="fetching" />
			) : (
				<div className="flex">
					<input
						type="text"
						ref={url}
						placeholder="https://faculty.daffodilvarsity.edu.bd/profile/cse/touhid.html"
					/>
					<button onClick={handleFetchInfo}>Fetch</button>
				</div>
			)}
			<div>
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
				<div>{loading ? <Loader msg="Sending" /> : <Button action={handleAddTeacher}>Add Teacher</Button>}</div>
			</div>
		</div>
	);
};

export default AddTeachers;
