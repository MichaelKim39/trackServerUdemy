// Mongoose required to communicate with mongoDB
// Must be configured as to what attributes exist of what type in what table
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

mongoose.model("User", userSchema);
// Don't need export - mongoose.model should only be run once
// Should only be imported once
// Using mongoose automatically creates DB for us
