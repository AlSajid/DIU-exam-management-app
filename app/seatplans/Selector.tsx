import Form from "@/components/Form/Form";
import getReqHandler from "@/utils/ReqHandler/getReqHandler.";
import {useEffect} from "react";
import {useState} from "react";

export default async function Selector() {
   const [days, setDays] = useState([]);
   const [shift, setShift] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const data = await getReqHandler("/api/routine");

         const days = data[0].days.map((item: any, index: number) => {
            return {
               name: item,
               value: index
            };
         });
         const shift = data[0].shifts.map((item: any, index: number) => {
            return {
               name: item.start + " - " + item.end,
               value: index
            };
         });

         setDays(days);
         setShift(shift);
      };
      fetchData();
   }, []);

   console.log(days, shift);

   return (
      <div>
         <Form
            input={[
               {
                  label: "Date",
                  type: "select",
                  options: days
               },
               {
                  label: "Shift",
                  type: "select",
                  options: shift
               }
            ]}
         />
      </div>
   );
}
