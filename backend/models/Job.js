const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    url: String,
    description: String,
    source: String,
    experience: String,
    salary: String
});

module.exports = mongoose.model("Job", JobSchema);
