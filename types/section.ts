import {Course} from "./course";
import {Teacher} from "./teachers";

export interface Section {
   course: Course;
   teacher: Teacher;
   section: string;
   students: number;
}
