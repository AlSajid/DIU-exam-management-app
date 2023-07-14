"use client";
import Board from "@/components/Board";
import Selector from "./Selector";
import {AllContexts} from "@/contexts/ContextProvider";
import {useContext} from "react";
import Input from "@/components/Form/Input";

export default function Page() {
   const {classrooms}: any = useContext(AllContexts);
   return (
      <Board heading="Seat Plan">
         <Selector />
         <table>
            <thead>
               <tr>
                  <th>Room</th>
                  <th>Row</th>
                  <th>Seats</th>
                  <th>Allocation</th>
               </tr>
            </thead>
            <tbody className="text-center">
               {classrooms?.map((classroom: any) => (
                  <tr key={classroom._id}>
                     <td>{classroom.room}</td>
                     <td>{classroom.row}</td>
                     <td>{classroom.seats}</td>
                     <td></td>
                  </tr>
               ))}
            </tbody>
         </table>
      </Board>
   );
}
