import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header/Header";
import useRoutine from "../../hooks/useRoutine";
import SeatPlan from "./SeatPlan";

const Routine = () => {
  const [routine, setRoutine] = useState([]);
  const [start, setStart] = useState({});
  const { generateRoutine } = useRoutine();

  const shifts = ["Morning", "Afternoon", "Evening"];
  const days = [
    "1 October 2022",
    "2 October 2022",
    "3 October 2022",
    "4 October 2022",
    "5 October 2022",
    "6 October 2022",
    "7 October 2022",
  ];

  const getRoutine = async () => {
    setStart(Date.now());
    setRoutine(await generateRoutine(shifts, days));
    // console.log("This routine has been generated in " + diff + " seconds");
  };

  return (
    <div className="mt-20">
      <Header />
      <div className=" container mx-auto text-center">
        <button
          className="text-lg border bg-blue-500 text-white rounded shadow w-1/3 p-3 m-5"
          onClick={() => getRoutine()}
        >
          Generate Routine
        </button>
        <table className="w-full">
          <thead>
            <tr>
              <td></td>
              {shifts.map((shift, key = 0) => (
                <td key={key}>{shift}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {routine.length > 0 && (
              <div>
                This routine has been generated in
                {" " + (Date.now() - start) / 1000 + " "}
                seconds
                <SeatPlan plan={routine} />
              </div>
            )}
            {/* {routine?.map((days, i = 0) => (
              <tr className="border">
                <td>{days[i++]}</td>
                <td>{console.log(days[0])}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Routine;
