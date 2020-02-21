const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

// Code to import track, direct require will cause multiple definitions calls to mongoose
const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("./tracks", async (req, res) => {
	const tracks = await Track.find({ userId: req.user._id });

	res.send(tracks);
});

module.exports = router;
