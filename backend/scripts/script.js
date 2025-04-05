
require("dotenv").config({ path: "../.env" }); 

const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const Job = require("../models/Job"); 

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}

mongoose.connect(mongoURI, {
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

const importCSV = async () => {
    try {
        const jobs = await csvtojson().fromFile("jobs.csv"); //correct path
        await Job.insertMany(jobs);
        console.log("CSV data imported successfully!");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error importing CSV:", err);
    }
};

importCSV();
