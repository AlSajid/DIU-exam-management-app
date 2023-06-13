// "use client";
// import Board from "@/components/Board";
// import {AllContexts} from "@/contexts/ContextProvider";
// import {useContext, useState} from "react";

// const Routine = () => {
// 	const [shifts, setShifts] = useState(["", "", ""]);
// 	const [days, setDays] = useState(["", "", ""]);
// 	const [exams, setExams] = useState([""]);
// 	const {courses} = useContext(AllContexts);

// 	// useEffect(() => {
// 	//     console.log(shifts)
// 	//     console.log(days)
// 	// }, [days, shifts])

// 	console.log(exams);

// 	return (
// 		<Board heading="Routine Planner">
// 			<h1 className="text-4xl text-center font-semibold  my-7 font-mono">Routine Planner</h1>

// 			<div className="flex m-3 justify-evenly">
// 				<div className="flex items-center">
// 					<span className="mx-3">Shifts:</span>
// 					<button
// 						className="border p-3 rounded"
// 						onClick={() => setShifts(shifts.slice(0, shifts.length - 1))}>
// 						-
// 					</button>
// 					<div className="border py-3 px-5">{shifts.length}</div>
// 					<button
// 						className="border p-3 rounded"
// 						onClick={() => setShifts([...shifts, ""])}>
// 						+
// 					</button>
// 				</div>

// 				<div className="flex items-center ">
// 					<span>Days:</span>
// 					<button
// 						className="border p-3 rounded"
// 						onClick={() => setDays(days.slice(0, days.length - 1))}>
// 						-
// 					</button>
// 					<div className="border py-3 px-5">{days.length}</div>
// 					<button
// 						className="border p-3 rounded"
// 						onClick={() => setDays([...days, ""])}>
// 						+
// 					</button>
// 				</div>
// 			</div>

// 			<table className="w-full border-2">
// 				<thead>
// 					<tr>
// 						<td className="border p-3 font-bold"></td>
// 						{shifts.map((shift, i) => (
// 							<td
// 								className="border p-3 font-bold text-center"
// 								key={i}>
// 								{
// 									<div className="flex flex-col">
// 										<div className="flex justify-evenly">
// 											<label>From</label>
// 											<input
// 												type="time"
// 												onChange={(e) => {
// 													const newShifts: any = [...shifts];
// 													newShifts[i] = {starts: e.target.value};
// 													setShifts(newShifts);
// 												}}
// 											/>
// 										</div>
// 										<div className="flex justify-evenly">
// 											<label>To</label>
// 											<input type="time" />
// 										</div>
// 									</div>
// 								}
// 							</td>
// 						))}
// 					</tr>
// 				</thead>
// 				{/* <tbody>
// 					{days.map((day, i) => (
// 						<tr key={i}>
// 							<td className="border p-3">
// 								{
// 									<input
// 										type="date"
// 										onChange={(e) => {
// 											const newDays = [...days];
// 											newDays[i] = e.target.value;
// 											setDays(newDays);
// 										}}
// 									/>
// 								}
// 							</td>
// 							{shifts.map((shift, j) => (
// 								<td
// 									className="border p-3"
// 									key={j}>
// 									{exams.map((exam, k) => exam)}
// 									<select className="w-full text-emerald-500">
// 										<option>...</option>
// 										{courses.map((course: any, k: number) => (
// 											<option
// 												key={k}
// 												onChange={() => setExams([...exams, {course: course.code, day: i, shift: j}])}
// 												value={course.code}>
// 												{course.title}
// 											</option>
// 										))}
// 									</select>
// 								</td>
// 							))}
// 						</tr>
// 					))}
// 				</tbody> */}
// 			</table>
// 		</Board>
// 	);
// };

// export default Routine;
