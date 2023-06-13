"use client";
import Button from "@/components/Button";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import {useRef, useState, useContext} from "react";
import {batch} from "@/public/batch";
import postReqHandler from "@/utils/postReqHandler";
import {toast} from "react-hot-toast";
import {AllContexts} from "@/contexts/ContextProvider";

export default function AddCourses() {
	const [loading, setLoading] = useState(false);
	const {getCourses}: any = useContext(AllContexts);

	const codeRef: any = useRef();
	const titleRef: any = useRef();
	const semesterRef: any = useRef();
	const shiftRef: any = useRef();

	const handleAddCourse = async () => {
		if (codeRef?.current?.value === "") {
			toast.error("Course Code is required");
			codeRef?.current?.focus();
			return;
		}

		if (titleRef?.current?.value === "") {
			toast.error("Course Title is required");
			titleRef?.current?.focus();
			return;
		}

		if (semesterRef?.current?.value === "") {
			toast.error("Semester is required");
			semesterRef?.current?.focus();
			return;
		}

		if (shiftRef?.current?.value === "") {
			toast.error("Shift is required");
			shiftRef?.current?.focus();
			return;
		}

		const data = {
			code: codeRef.current.value,
			title: titleRef.current.value,
			semester: semesterRef.current.value,
			shift: shiftRef.current.value
		};

		setLoading(true);
		const response = await postReqHandler(`/api/courses/`, data);
		if (response === 200) {
			getCourses();
			codeRef.current.value = "";
			titleRef.current.value = "";
			semesterRef.current.value = "";
			shiftRef.current.value = "";
		}
		setLoading(false);
	};

	return (
		<div className="my-7">
			<Form
				input={[
					{label: "Course Code", ref: codeRef, type: "text", onChange: (e: any) => (e.target.value = e.target.value.toUpperCase())},
					{label: "Course Title", ref: titleRef, type: "text"},
					{label: "Semester", ref: semesterRef, type: "select", options: batch},
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

			<div>{loading ? <Loader msg="Sending" /> : <Button action={handleAddCourse}>Add Course</Button>}</div>
		</div>
	);
}
