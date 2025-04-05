const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const filters = [];

        Object.keys(req.query).forEach((key) => {
            let values = req.query[key];

            if (typeof values === "string") {
                values = [values]; // Convert single values to an array
            }
            
            // regex for partial matches (case-insensitive)
            values.forEach((value) => {
                filters.push({ [key]: { $regex: value, $options: "i" } });
            });
        });

        const query = filters.length > 0 ? { $or: filters } : {}; 

        // Pagination
        const page = parseInt(req.query.page) || 1;  // Default page 1
        const limit = 15;  // 15 jobs per page
        const skip = (page - 1) * limit;

        const jobs = await Job.find(query).skip(skip).limit(limit);
        const totalJobs = await Job.countDocuments(query);

        res.status(200).json({
            jobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: page,
            totalJobs
        });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

module.exports = router;
