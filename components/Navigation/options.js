import {FaChalkboardTeacher} from "react-icons/fa";
import {SiGoogleclassroom} from "react-icons/si";
import {GoMortarBoard} from "react-icons/go";
import {ImCalendar, ImBooks} from "react-icons/im";
import {MdOutlineEventSeat} from "react-icons/md";
import {GiCctvCamera} from "react-icons/gi";

export const options = [
   {name: "Courses", icon: <ImBooks />},
   {name: "Teachers", icon: <FaChalkboardTeacher />},
   {name: "Sections", icon: <GoMortarBoard />},
   {name: "Classrooms", icon: <SiGoogleclassroom />},
   {name: "Routine", icon: <ImCalendar />},
   {name: "SeatPlans", icon: <MdOutlineEventSeat />},
   {name: "Invigilation", icon: <GiCctvCamera />}
];
