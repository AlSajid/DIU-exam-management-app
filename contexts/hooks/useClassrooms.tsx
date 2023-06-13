import {useEffect, useState} from "react";

export default function useClassrooms() {
	const [classrooms, setClassrooms] = useState();

	const getClassrooms = () => {
		fetch(`/api/classrooms`)
			.then((response) => response.json())
			.then((data) => setClassrooms(data));
	};

	useEffect(() => {
		getClassrooms();
	}, []);

	return {classrooms, getClassrooms};
}
