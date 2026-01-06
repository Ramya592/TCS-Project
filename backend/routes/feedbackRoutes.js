const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

/* ---------- POST feedback ---------- */
router.post("/", async (req, res) => {
  try {
    const { feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({ message: "Feedback is required" });
    }

    const newFeedback = new Feedback({ feedback });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------- GET feedback (optional, for testing) ---------- */
router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

module.exports = router;
