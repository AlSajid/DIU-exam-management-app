"use client";
import Board from "@/components/Board";
import Button from "@/components/Button";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import {AllContexts} from "@/contexts/ContextProvider";
import {batch} from "@/public/batch";
import putReqHandler from "@/utils/putReqHandler";
import {useRouter} from "next/navigation";
import {useState, useRef, useContext, useEffect} from "react";
import {toast} from "react-hot-toast";

export default function Page({params}: any) {
	const {courses, getCourses}: any = useContext(AllContexts);
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const codeRef: any = useRef();
	const titleRef: any = useRef();
	const semesterRef: any = useRef();
	const shiftRef: any = useRef();

	useEffect(() => {
		if (!courses) return;
		const info = courses.find((item: any) => item._id === params.id);

		codeRef.current.value = info.code;
		titleRef.current.value = info.title;
		semesterRef.current.value = info.semester;
		shiftRef.current.value = info.shift;
	}, [courses, params.id]);

	const handleUpdate = async () => {
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
		const response = await putReqHandler(`/api/courses?id=${params.id}`, data);
		setLoading(false);

		if (response === 200) {
			getCourses();
			router.push(`/courses`);
		}
	};

	return (
		<Board heading="Update Course Information">
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
				<div>{loading ? <Loader msg="Updating" /> : <Button action={handleUpdate}>Update</Button>}</div>
			</div>
		</Board>
	);
}
