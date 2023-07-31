"use client";

import Board from "@/components/Board";
import AddSection from "./AddSection";
import ViewSections from "./ViewSections";
import Tab from "@/components/Tab";
import {useCallback, useEffect, useState} from "react";
import {Section} from "@/types/section";
import {toast} from "react-hot-toast";

export default function Page({params}: {params: {courseId: string}}) {
   const [sections, setSections] = useState<Section[] | null>(null);

   const getSections = useCallback(() => {
      fetch(`/api/sections/${params.courseId}`)
         .then(res => res.json())
         .then(data => {
            setSections(data);
         })
         .catch(err => {
            toast.error("Something went wrong!");
            console.log(err);
         });
   }, [params.courseId]);

   useEffect(() => {
      getSections();
   }, [getSections, params.courseId]);

   return (
      <Board heading="Sections">
         <Tab
            header={["Sections", "Add Sections"]}
            content={[
               <ViewSections getSections={getSections} sections={sections} key={0} />,
               <AddSection getSections={getSections} courseId={params.courseId} key={1} />
            ]}
         />
      </Board>
   );
}
