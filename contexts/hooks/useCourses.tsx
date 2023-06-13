import {useEffect, useState} from "react";

export default function useCourses() {
	const [courses, setCourses] = useState();

	const getCourses = () => {
		fetch(`/api/courses`)
			.then((response) => response.json())
			.then((data) => setCourses(data));
	};

	useEffect(() => {
		getCourses();
	}, []);

	return {courses, getCourses};
}
