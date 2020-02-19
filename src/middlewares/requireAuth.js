// Middleware functions here
// Takes request and does some pre-processing
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
	// headers lowercased from request automatically
	const { authorization } = req.headers;
	// authorization === 'Bearer: <JWT>'

	if (!authorization) {
		return res.status(401).send({ error: "You must be logged in (1)" });
	}

	const token = authorization.replace("Bearer", "");
	jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
		if (err) {
			console.log(err.message);
			return res.status(401).send({ error: "You must be logged in (2)" });
		}

		const { userId } = payload;

		const user = await User.findById(userId);
		req.user = user;
		next();
	});
};
