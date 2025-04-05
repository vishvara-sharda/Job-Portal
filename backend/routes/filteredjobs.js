
const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const query = {};

        // Build query with AND conditions
        Object.keys(req.query).forEach((key) => {
            let values = req.query[key];

            if (typeof values === "string") {
                values = [values]; // Ensure it's an array
            }

            // If multiple values for same key, match any of them (e.g., Delhi or Gujarat)
            if (values.length > 1) {
                query[key] = { $in: values.map(value => new RegExp(value, "i")) };
            } else {
                query[key] = { $regex: values[0], $options: "i" }; // Single value match
            }
        });

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = 15;
        const skip = (page - 1) * limit;

        const jobs = await Job.find(query).skip(skip).limit(limit);
        const totalJobs = await Job.countDocuments(query);

        res.status(200).json({
            jobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: page,
            totalJobs,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

module.exports = router;
