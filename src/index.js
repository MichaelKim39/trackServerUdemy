// Import libraries
require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

// body parser used so express API can understand JSON
// Must put above auth routes so requests handled after JSON parsed
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
	"mongodb+srv://admin:passwordpassword@cluster0-51dti.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true
});
mongoose.connection.on("connected", () => {
	console.log("Connected to Mongo instance");
});
mongoose.connection.on("error", err => {
	console.error("Error connecting to mongo", err);
});

// Respond to get request to root route with res.send
app.get("/", requireAuth, (req, res) => {
	res.send(`Your Email: ${req.user.email}`);
});

// Listen to some port on local machine
app.listen(3000, () => {
	console.log("Listening on port 3000");
});

/*
node src/index.js
npm run dev
Nodemon automatically restarts servers on change
*/
