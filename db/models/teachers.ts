import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
	{
		employeeID: {type: Number, unique: true},
		name: {type: String},
		designation: {type: String},
		department: {type: String},
		email: {type: String, unique: true},
		phone: {type: String, unique: true}
	},
	{versionKey: false}
);

const Teacher = mongoose.model("teacher", teacherSchema);
export default Teacher;
