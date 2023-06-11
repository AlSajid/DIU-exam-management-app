import mongoose from "mongoose";

export default async function connect() {
	if (mongoose.connection.readyState === 1) {
		console.log("✔ MongoDB already connected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI || "", {
			dbName: "cse",
			ssl: true,
		});

		console.log("✔ MongoDB connected");
	} catch (error) {
		console.log(error);
	}
}
