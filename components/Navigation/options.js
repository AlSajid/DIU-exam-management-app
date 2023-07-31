import {FaChalkboardTeacher} from "react-icons/fa";
import {SiGoogleclassroom} from "react-icons/si";
import {ImCalendar, ImBooks} from "react-icons/im";
import {MdOutlineEventSeat} from "react-icons/md";
import {GiCctvCamera} from "react-icons/gi";

export const options = [
   {name: "Classrooms", icon: <SiGoogleclassroom />},
   {name: "Courses", icon: <ImBooks />},
   {name: "Teachers", icon: <FaChalkboardTeacher />},
   {name: "Routine", icon: <ImCalendar />},
   {name: "SeatPlans", icon: <MdOutlineEventSeat />},
   {name: "Invigilation", icon: <GiCctvCamera />}
];
