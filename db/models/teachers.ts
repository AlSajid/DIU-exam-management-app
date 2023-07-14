import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
   {
      employeeID: {type: Number, required: false},
      name: {type: String, required: true},
      designation: {type: String, required: true},
      profile: {type: String},
      department: {type: String, required: true},
      email: {type: String, required: true},
      phone: {type: String, required: true},
      initial: {type: String, required: true}
   },
   {versionKey: false, timestamps: true}
);

const Teacher = mongoose.model("teacher", teacherSchema);
export default Teacher;
