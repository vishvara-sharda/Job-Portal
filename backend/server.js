require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
//Routes 
const jobRoutes = require("./routes/filteredjobs");
const registerRoute = require("./routes/userRegister");
const authRoutes = require("./routes/auth");
const profile = require("./routes/userProfile")

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}

mongoose.connect(mongoURI, {
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usersRegister", registerRoute);
app.use("/api/profile",profile)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
