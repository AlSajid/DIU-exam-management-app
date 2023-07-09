"use client";
import Board from "@/components/Board";
import Clock from "react-live-clock";
import {useState} from "react";

export default function Home() {
   const [date, setDate] = useState(new Date());

   return (
      <main className="bg-slate-50 h-screen">
         <Board heading="Welcome!">
            <div className="flex gap-10 m-10 flex-col items-center justify-center">
               <Clock
                  noSsr={true}
                  className="text-7xl text-teal-950 font-bol font-mono"
                  format={"hh:mm:ss"}
                  timezone={"Asia/Dhaka"}
                  ticking={true}
               />
               <span className="text-3xl text-teal-950 font-thin font-mono">
                  {new Intl.DateTimeFormat("en-US", {
                     day: "numeric",
                     month: "long",
                     year: "numeric"
                  }).format(date)}
               </span>
            </div>
         </Board>
      </main>
   );
}
