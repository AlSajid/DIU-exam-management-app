import {Schema, model} from "mongoose";

const sectionSchema = new Schema(
   {
      courseId: {type: Schema.Types.ObjectId},
      teacherId: {type: Schema.Types.ObjectId},
      section: {type: String, unique: true},
      students: {type: Number}
   },
   {versionKey: false}
);

const Section = model("Section", sectionSchema);
export default Section;
