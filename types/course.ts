import { semesters } from '@/public/config';
export interface Course {
   _id: string;
   title: string;
   code: string;
   semesters: typeof semesters;
   batch: string;
   shift: string;
   
}
