const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

/* ---------- Middleware ---------- */
app.use(cors());
app.use(bodyParser.json());

/* ---------- Routes ---------- */
app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ---------- MongoDB ---------- */
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });


/* ---------- Start Server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
