import {useEffect, useState} from "react";

const useTeachers = () => {
	const [teachers, setTeachers] = useState([]);

	const getTeachers = () => {
		fetch(`/api/teachers`)
			.then((response) => response.json())
			.then((data) => setTeachers(data));
	};

	useEffect(() => {
		getTeachers();
	}, []);

	return {teachers, getTeachers};
};

export default useTeachers;
