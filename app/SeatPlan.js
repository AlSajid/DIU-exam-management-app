import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";

const SeatPlan = ({ plan }) => {
  console.log(plan);
  return (
    <div>
      <Header />
      <div className="mx-auto container mt-20">
        <div className="my-5 ">
          <h1 className="text-3xl">SeatPlan</h1>
          {/* <span className="text-">
            The Assigned Courses for the CSE department
          </span> */}
        </div>

        <table className="w-full border-2">
          <thead>
            <tr className="border-2 text-lg text-center p-3 font-semibold">
              <td className="border-2 p-3">Date</td>
              <td className="border-2 p-3">Shift</td>
              <td className="border-2 p-3">Building</td>
              <td className="border-2 p-3">Room</td>
              <td className="border-2 p-3">Column</td>
              <td className="border-2 p-3">Level - Term</td>
              <td className="border-2 p-3">Course Code</td>
              <td className="border-2 p-3">Sections</td>
              <td className="border-2 p-3">Total</td>
            </tr>
          </thead>
          <tbody className="h-10 bg-green-50 overflow-hidden">
            {plan?.map((exam, i = 0) => (
              <tr>
                <td className="border p-3">{exam.day}</td>
                <td className="border p-3">{exam.shift}</td>
                <td className="border p-3">{exam.building}</td>
                <td className="border p-3">{exam.room}</td>
                <td className="border p-3">{exam.column}</td>
                <td className="border p-3">{`L${exam.LT[0]}T${exam.LT[1]}`}</td>
                <td className="border p-3">{exam.course}</td>
                <td className="border p-3">{exam.section}</td>
                <td className="border p-3">{exam.seat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeatPlan;
