const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// JWT Secret Key (You should move this to environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET;
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        //Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not registered" });
        }

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        //Create JWT token (expires in 7 days)
        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        //return user info + token
        res.status(200).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                username: user.username,
                phone: user.phone
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;