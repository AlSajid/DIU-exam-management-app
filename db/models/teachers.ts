import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
	{
		employeeID: {type: Number, required: false},
		name: {type: String, required: true},
		designation: {type: String, required: true},
		department: {type: String, required: true},
		email: {type: String, unique: true, required: true},
		phone: {type: String, unique: true, required: true}
	},
	{versionKey: false}
);

const Teacher = mongoose.model("teacher", teacherSchema);
export default Teacher;