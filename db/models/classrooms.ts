import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema(
	{
		room: {type: String, required: true},
		row: {type: Number, required: true},
		seats: {type: Number, required: true}
	},
	{versionKey: false}
);

const Classroom = mongoose.model("Classroom", classroomSchema);
export default Classroom;
