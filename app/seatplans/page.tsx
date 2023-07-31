"use client";

import Board from "@/components/Board";
import ExamSelector from "./ExamSelector";
import {AllContexts} from "@/contexts/ContextProvider";
import {useContext, useState, useRef, useEffect} from "react";
import CourseSelector from "./CourseSelector";

export default function Page() {
   const {classrooms}: any = useContext(AllContexts);
   const [hasChanged, setHasChanged] = useState(false);

   const dayRef = useRef<HTMLSelectElement | null>(null);
   const shiftRef = useRef<HTMLSelectElement | null>(null);

   useEffect(() => {
      const fetchRoutine = async () => {
         // const courseList = await getReqHandler("/api/courses/all");
         // setCourses(courseList);
         // const data = await getReqHandler("/api/routine");
         // setShifts(data[0].shifts);
         // setDays(data[0].days);
         // setRoutine(data[0].routine);
         // setLoading(false);
      };
      fetchRoutine();
   }, []);

   return (
      <Board heading="Seat Plan">
         <ExamSelector dayRef={dayRef} shiftRef={shiftRef} />
         <table>
            <thead>
               <tr>
                  <th>Room</th>
                  <th>Row</th>
                  <th>Seats</th>
                  <th>Course</th>
               </tr>
            </thead>
            <tbody className="text-center">
               {classrooms?.map((classroom: any) => (
                  <tr key={classroom._id}>
                     <td>{classroom.room}</td>
                     <td>{classroom.row}</td>
                     <td>{classroom.seats}</td>
                     <td>
                        <CourseSelector setHasChanged={setHasChanged} />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </Board>
   );
}
