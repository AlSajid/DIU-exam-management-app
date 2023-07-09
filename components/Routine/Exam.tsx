import {useRef, useState, useEffect} from "react";
import {ImCross} from "react-icons/im";
import filterCourses from "@/utils/filterCourses";

interface ExamProps {
   data: any;
   routine: any;
   setRoutine: Function;
   position: string;
   setHasChanged: Function;
}

const Exam: React.FC<ExamProps> = ({data, routine, setRoutine, position, setHasChanged}) => {
   const inputRef = useRef<HTMLInputElement>(null);

   const [courses, setCourses] = useState<any[]>([]);
   const [exams, setExams] = useState<any[]>([]);
   const [filteredResults, setFilteredResults] = useState<any[]>([]);

   useEffect(() => {
      if (data === undefined) return;

      const filter: any = filterCourses(data, routine);
      setCourses(filter);
   }, [data, routine]);

   useEffect(() => {
      if (routine[position] === undefined) return;
      setExams(routine[position]);
   }, [position, routine]);

   const handleInput = () => {
      if (inputRef.current?.value === "") {
         setFilteredResults([]);
      } else {
         const input = inputRef.current?.value.toLowerCase() || "";

         const filtered = courses.filter((course: any) => {
            const keyword = course["semester"] + " : " + course["code"] + " : " + course["title"];
            return keyword.toLowerCase().includes(input);
         });
         setFilteredResults(filtered);
      }
   };

   const handleSelect = (item: any) => {
      inputRef.current!.value = "";
      setFilteredResults([]);

      let updatedExams: any = [...exams, item];
      setExams(updatedExams);

      setRoutine((prev: any) => {
         let updatedRoutine: any = {
            ...prev,
            [position]: updatedExams
         };
         return updatedRoutine;
      });

      setHasChanged(true);
   };

   const handleRemoveExam = (index: number) => {
      let updatedExams: any = [...exams];
      updatedExams.splice(index, 1);
      setExams(updatedExams);

      setRoutine((prev: any) => {
         let updatedRoutine: any = {
            ...prev,
            [position]: updatedExams
         };
         return updatedRoutine;
      });

      setHasChanged(true);
   };

   return (
      <>
         {exams.map((exam: any, i) => {
            return (
               <div
                  key={i}
                  className="bg-slate-100 m-1 p-1 text-base flex gap-1 items-center justify-between">
                  <span>
                     {exam.semester} : {exam.code} - {exam.title}
                  </span>
                  <span
                     className="hover:bg-red-700 hover:text-white p-1 cursor-pointer"
                     onClick={() => handleRemoveExam(i)}>
                     <ImCross />
                  </span>
               </div>
            );
         })}

         <input ref={inputRef} onChange={handleInput} />

         {filteredResults.length > 0 && (
            <ul
               onBlur={() => setFilteredResults([])}
               className="absolute min-h-fit max-h-36 overflow-auto border shadow w-96 bg-white p-1 border-emerald-700">
               {filteredResults.map((course: any, index: number) => (
                  <li
                     className="p-3 text-sm bg-slate-100 my-1 cursor-pointer"
                     key={index}
                     onClick={() => handleSelect(course)}>
                     {course["semester"] + " : " + course["code"] + " - " + course["title"]}
                  </li>
               ))}
            </ul>
         )}
      </>
   );
};

export default Exam;
