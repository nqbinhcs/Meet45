const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Make request using body x-www
app.use("/api/users", require("./routes/authRoute"));
app.use("/api/meetings", require("./routes/meetingRoute"));

app.listen(port, () => console.log(`Server started on port ${port}`));
