const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// POST feedback
router.post('/', async (req, res) => {
    try {
        const { feedback } = req.body;

        if (!feedback) {
            return res.status(400).json({ message: 'Feedback is required' });
        }

        const newFeedback = new Feedback({
            feedback
        });

        await newFeedback.save();

        res.status(201).json({
            message: 'Feedback submitted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
