import { useEffect, useState } from "react";

const useRoutine = () => {
  const LT = [11, 12, 21, 22, 31, 32, 41, 42];

  // initial data
  const [classrooms, setClassroom] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // get all teachers
    fetch(`https://diu-ems-express.onrender.com/teachers`)
      .then((response) => response.json())
      .then((data) => setTeachers(data));

    // get all classrooms
    fetch(`https://diu-ems-express.onrender.com/classrooms`)
      .then((response) => response.json())
      .then((data) => setClassroom(data));

    // get all sections
    fetch(`https://diu-ems-express.onrender.com/sections`)
      .then((response) => response.json())
      .then((data) => setSections(data));
  }, []);

  const getCourses = (sections) => {
    const courses = { maxAssigned: 0 };
    for (let i = 0; i < LT.length; i++) {
      courses[LT[i]] = [];
    }

    let course = {};
    let totalAssigned = 0;

    for (let i = 0; i < sections.length; i++) {
      if (
        sections[i - 1]?.course_code !== sections[i]?.course_code ||
        sections[i - 1]?.LT !== sections[i]?.LT
      ) {
        course = {
          code: sections[i].course_code,
          name: sections[i].title,
          LT: sections[i].LT,
          sections: [],
        };
      }

      course.sections.push({
        name: sections[i].section,
        count: sections[i].assigned,
      });
      totalAssigned += sections[i].assigned;

      if (
        sections[i + 1]?.course_code !== sections[i]?.course_code ||
        sections[i + 1]?.LT !== sections[i]?.LT
      ) {
        course.total = totalAssigned;
        if (totalAssigned > courses.maxAssigned) {
          courses.maxAssigned = totalAssigned;
        }

        courses[sections[i].LT].push(course);
        course = {};
        totalAssigned = 0;
      }
    }

    return courses;
  };

  const totalSeats = (classrooms) => {
    let total = 0;
    for (let i = 0; i < classrooms.length; i++) {
      total += classrooms[i].seat;
    }

    return total;
  };

  const generateRoutine = (shifts, days) => {
    const seatPlan = [];
    const finalRoutine = [];
    let totalBookedSeat = 0;

    // total calculation
    const courses = getCourses(sections);
    let numOfSeats = totalSeats(classrooms);

    if (numOfSeats < courses.maxAssigned) {
      return { error: "Not enough seats" };
    }

    let LTposition = 0;
    const getACourse = (availableSeats) => {
      // remove empty batches
      for (let i = LT.length - 1; i >= 0; i--) {
        if (courses[LT[i]].length === 0) {
          const index = LT.indexOf(LT[i]);
          if (index > -1) {
            LT.splice(index, 1);
          }
        }
      }
      if (LT.length === 0) return "end";

      if (LTposition > LT.length - 1) {
        LTposition = 0;
      }

      let course = courses[LT[LTposition]].find(
        (course) => course.total < availableSeats
      );
      if (course === undefined) return "next";

      courses[LT[LTposition]].splice(
        courses[LT[LTposition]].indexOf(course),
        1
      );
      LTposition++;

      return course;
    };

    let course;

    // routine generation
    routine: for (let day = 0; day < days.length; day++) {
      // iterating through exam days
      const dayRoutine = [];

      for (let shift = 0; shift < shifts.length; shift++) {
        //iterating through exam shifts
        const shiftRoutine = [];

        for (let i = 0; i < classrooms.length; i++) {
          // iterating through all allocated rooms in a shift

          if (course === undefined || course?.sections?.length === 0) {
            course = getACourse(numOfSeats - totalBookedSeat); // pick a course for remaining seats

            if (course === "end") break; // end of routine generation (no more courses left)
            if (course === "next") {
              course = undefined;
              totalBookedSeat = 0;
              i = classrooms.length;
              break;
            }
            shiftRoutine.push(course);
          }

          seatPlan.push({
            day: days[day],
            shift: shifts[shift],
            building: classrooms[i].building,
            column: classrooms[i].column,
            room: classrooms[i].room,
            course: course.code,
            LT: course.LT,
            seat:
              course.sections[0].count < classrooms[i].seat
                ? course.sections[0].count
                : classrooms[i].seat,
            section: course.sections[0].name,
          });

          // allocating same column for next section
          if (course.sections[0].count < classrooms[i].seat) {
            classrooms[i].seat -= course.sections[0].count;
            totalBookedSeat += course.sections[0].count;
            course.sections.splice(0, 1);
            i--;
          } else {
            course.sections[0].count -= classrooms[i].seat;
            totalBookedSeat += classrooms[i].seat;
          }
        }

        dayRoutine.push(shiftRoutine);
        if (course === "end") break;
      }

      finalRoutine.push(dayRoutine);
      if (course === "end") break;
    }

    console.log(seatPlan);
    console.log(finalRoutine);
    console.log(" ");

    return seatPlan;
  };

  return { generateRoutine };
};

export default useRoutine;

// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('ACT211','Financial and Managerial Accounting','21','A','723300230','41');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('ACT211','Financial and Managerial Accounting','21','B','723300230','40');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('ACT211','Financial and Managerial Accounting','21','C','723300230','43');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('ACT211','Financial and Managerial Accounting','21','D','723300230','38');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('CSE115','Introduction to Biology and Chemistry for computation','11','E','723300230','45');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('CSE115','Introduction to Biology and Chemistry for computation','11','F','723300230','46');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('CSE115','Introduction to Biology and Chemistry for computation','11','G','723300230','45');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('CSE115','Introduction to Biology and Chemistry for computation','11','H','723300230','46');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('CSE115','Introduction to Biology and Chemistry for computation','11','I','723300230','45');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('CSE115','Introduction to Biology and Chemistry for computation','11','J','723300230','45');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('CSE115','Introduction to Biology and Chemistry for computation','11','K','723300230','47');
// INSERT INTO `sections`(`course_code`, `title`, `LT`, `section`, `teacher`, `assigned`) VALUES ('CSE115','Introduction to Biology and Chemistry for computation','11','L','723300230','46');
