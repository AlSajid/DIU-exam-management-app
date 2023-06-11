import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
	{
		code: {type: String, required: true},
		title: {type: String, required: true},
		semester: {type: String, required: true},
		shift: {type: String, required: true}
	},
	{versionKey: false}
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
