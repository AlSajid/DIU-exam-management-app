import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { RiTeamLine } from "react-icons/ri";
import { GoMortarBoard } from "react-icons/go";
import { ImCalendar, ImBooks } from "react-icons/im";

export const options = [
	{ name: "Committee", icon: <RiTeamLine /> },
	{ name: "Courses", icon: <ImBooks /> },
	{ name: "Teachers", icon: <FaChalkboardTeacher /> },
	{ name: "Sections", icon: <GoMortarBoard /> },
	{ name: "Classrooms", icon: <SiGoogleclassroom /> },
	{ name: "Routine", icon: <ImCalendar /> }
];