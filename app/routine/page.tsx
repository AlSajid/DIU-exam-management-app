"use client";
import Board from "@/components/Board";
import Loader from "@/components/Loader";
import Days from "@/components/Routine/Days";
import Exam from "@/components/Routine/Exam";
import PlanController from "@/components/Routine/PlanController";
import Shifts from "@/components/Routine/Shifts";
import {AllContexts} from "@/contexts/ContextProvider";
import getReqHandler from "@/utils/getReqHandler.";
import putReqHandler from "@/utils/putReqHandler";
import {useContext, useState, useEffect} from "react";

const Routine = () => {
   const {courses}: any = useContext(AllContexts);

   const [loading, setLoading] = useState<boolean>(true);
   const [shifts, setShifts] = useState([]);
   const [days, setDays] = useState([]);
   const [routine, setRoutine] = useState<any>({});
   const [hasChanged, setHasChanged] = useState<boolean>(false);

   useEffect(() => {
      const fetchRoutine = async () => {
         const data = await getReqHandler("/api/routine");
         setShifts(data[0].shifts);
         setDays(data[0].days);
         setRoutine(data[0].routine);
         setLoading(false);
      };
      fetchRoutine();
   }, []);

   const handleSave = () => {
      setHasChanged(false);
      putReqHandler("/api/routine", {
         shifts,
         days,
         routine
      });
   };

   return (
      <Board heading="Routine Planner">
         <div className="flex m-3 justify-evenly">
            <PlanController planType="Shifts" plan={shifts} setPlan={setShifts} />
            <PlanController planType="Days" plan={days} setPlan={setDays} />

            <button disabled={!hasChanged} onClick={handleSave}>
               Save
            </button>
         </div>
         {loading ? (
            <Loader msg="fetching routine table" />
         ) : (
            <table className="w-full border-2">
               <thead>
                  <tr>
                     <td></td>
                     <Shifts shifts={shifts} setShifts={setShifts} setHasChanged={setHasChanged} />
                  </tr>
               </thead>

               <tbody>
                  {days.map((day, i) => (
                     <tr key={i}>
                        <td>
                           <Days
                              serial={i}
                              days={days}
                              setDays={setDays}
                              i={i}
                              setHasChanged={setHasChanged}
                           />
                        </td>

                        {shifts.map((shift, j) => (
                           <td className="border p-3" key={j}>
                              <Exam
                                 data={courses}
                                 routine={routine}
                                 setRoutine={setRoutine}
                                 position={i + "" + j}
                                 setHasChanged={setHasChanged}
                              />
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </Board>
   );
};

export default Routine;
