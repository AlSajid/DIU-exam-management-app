// import Button from "@/components/Button";
// import Form from "@/components/Form/Form";
// import Loader from "@/components/Loader";
// import {AllContexts} from "@/contexts/ContextProvider";
// import {useContext, useEffect, useState} from "react";

// const AddClassroom = () => {
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState("");
// 	const [info, setInfo] = useState({});
// 	const [filteredCourses, setFilteredCourses] = useState([]);

// 	const {courses, teachers, getSections}: any = useContext(AllContexts);

// 	useEffect(() => {
// 		if (courses) {
// 			const filtered = courses.filter((course) => course.semester === info.Semester);
// 			setFilteredCourses(filtered);
// 		}
// 	}, [courses, info.Semester]);

// 	const handleAddSection = async () => {
// 		setLoading(true);

// 		fetch(`https://diu-ems-express.onrender.com/sections/`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json"
// 			},
// 			body: JSON.stringify(info)
// 		})
// 			.then((response) => response.json())
// 			.then((data) => {
// 				if (data.code === 11000) {
// 					setError("This Section already exists");
// 				} else {
// 					setError("");
// 					setInfo({});
// 					alert("Section added successfully");
// 					setLoading(false);
// 					getSections();
// 				}
// 			})
// 			.catch((error) => console.error(error));
// 	};

// 	return (
// 		<>
// 			<Form
// 				setValue={setInfo}
// 				values={info}
// 				input={[
// 					{
// 						label: "Semester",
// 						type: "select",
// 						options: [
// 							{name: "L1T1", value: "L1T1"},
// 							{name: "L1T2", value: "L1T2"},
// 							{name: "L2T1", value: "L2T1"},
// 							{name: "L2T2", value: "L2T2"},
// 							{name: "L3T1", value: "L3T1"},
// 							{name: "L3T2", value: "L3T2"},
// 							{name: "L4T1", value: "L4T1"},
// 							{name: "L4T2", value: "L4T2"}
// 						]
// 					},
// 					{
// 						label: "Course",
// 						type: "select",
// 						options: filteredCourses.map((course) => {
// 							return {
// 								name: course.title,
// 								value: course.code
// 							};
// 						})
// 					},
// 					{
// 						label: "Teacher",
// 						type: "select",
// 						options: teachers.map((teacher) => {
// 							return {
// 								name: teacher.name,
// 								value: teacher.employee_ID
// 							};
// 						})
// 					},
// 					{
// 						label: "Section",
// 						type: "text"
// 					},
// 					{
// 						label: "Students",
// 						type: "number"
// 					}
// 				]}
// 			/>

// 			<div className="text-center p-3">{loading ? <Loader msg="Sending Information to the Server" /> : info.Course !== undefined && info.Course !== "" && info.Section !== undefined && info.Section !== "" && info.Semester !== undefined && info.Semester !== "" && info.Students !== undefined && info.Students !== "" && info.Teacher !== undefined && info.Teacher !== "" && <Button onClick={handleAddSection} />}</div>
// 		</>
// 	);
// };

// export default AddClassroom;
