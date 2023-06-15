import mongoose, {Schema} from "mongoose";

const sectionSchema = new mongoose.Schema(
	{
		course: {type: Schema.Types.ObjectId},
		teacher: {type: Schema.Types.ObjectId},
		section: {type: String},
		students: {type: Number}
	},
	{versionKey: false}
);

const Section = mongoose.model("Section", sectionSchema);
export default Section;
