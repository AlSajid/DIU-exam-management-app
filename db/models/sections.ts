import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
	code: {type: String, unique: true},
	name: {type: String},
	semester: {type: String},
	credit: {type: Number}
});

const Section = mongoose.model("Section", sectionSchema);
export default Section;
