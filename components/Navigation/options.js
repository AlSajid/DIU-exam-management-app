//icons
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GrSchedule } from "react-icons/gr";
import { RiTeamLine } from "react-icons/ri";
// import { AllContexts } from "../../contexts/hooks/ContextProvider";
import { GoMortarBoard } from "react-icons/go";

export const options = [
  { name: "Committee", icon: <RiTeamLine className="mx-auto" /> },
  { name: "Teachers", icon: <FaChalkboardTeacher className="mx-auto" /> },
  { name: "Students", icon: <GoMortarBoard className="mx-auto" /> },
  { name: "Classrooms", icon: <SiGoogleclassroom className="mx-auto" /> },
  { name: "Courses", icon: <GrSchedule className="mx-auto" /> },
  { name: "Routine", icon: <GrSchedule className="mx-auto" /> },
];
