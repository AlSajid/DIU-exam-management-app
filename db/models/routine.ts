import mongoose from "mongoose";

const routineSchema = new mongoose.Schema(
   {
      days: {type: Array, required: true},
      shifts: {type: Array, required: true},
      routine: {type: Object, required: true}
   },
   {versionKey: false}
);

const Routine = mongoose.model("Routine", routineSchema);
export default Routine;
