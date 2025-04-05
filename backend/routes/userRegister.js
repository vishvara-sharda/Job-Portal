const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const router = express.Router();
router.post("/register", async (req, res) => {
    const { name, email, username, phone, password } = req.body;

    try {
        // Check user
        const existingUser = await User.findOne({
            $or: [
                { email },
                { username },
                { phone }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ error: "Email, username or phone already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create and save the user
        const newUser = new User({
            name,
            email,
            username,
            phone,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ error: "Something went wrong during registration" });
    }
});

module.exports = router;