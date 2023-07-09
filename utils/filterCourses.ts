export default function filterCourses(courses: any, routine: any) {
   if (Object.keys(routine).length === 0) return courses;
   const routineCourses = Object.values(routine).flat();
   const filteredCourses = courses.filter(
      (course: any) => !routineCourses.some((exam: any) => exam._id === course._id)
   );

   return filteredCourses;
}
