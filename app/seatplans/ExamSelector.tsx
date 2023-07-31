import Form from "@/components/Form/Form";
import getReqHandler from "@/utils/ReqHandler/getReqHandler.";
import convert24to12 from "@/utils/convert24to12";
import {useEffect} from "react";
import {useState} from "react";

export default async function ExamSelector({dayRef, shiftRef}: any) {
   const [days, setDays] = useState([]);
   const [shift, setShift] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const data = await getReqHandler("/api/routine");
         console.log(data);

         const days = data[0].days.map((item: any, index: number) => {
            return {
               name: item,
               value: index
            };
         });
         const shift = data[0].shifts.map((item: any, index: number) => {
            return {
               name: convert24to12(item.start) + " - " + convert24to12(item.end),
               value: index
            };
         });

         setDays(days);
         setShift(shift);
      };
      fetchData();
   }, []);

   return (
      <div>
         <Form
            input={[
               {
                  label: "Date",
                  type: "select",
                  options: days,
                  ref: dayRef
               },
               {
                  label: "Shift",
                  type: "select",
                  options: shift,
                  ref: shiftRef
               }
            ]}
         />
      </div>
   );
}
