const express = require("express");
const authenticateToken = require("../middleware/authentication");
const User = require("../models/userModel");

const router = express.Router();

router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
});

module.exports = router;