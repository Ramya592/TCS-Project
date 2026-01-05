const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment');

const Feedback = require('../models/feedback');

const sentiment = new Sentiment();

// POST /api/feedback
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        const result = sentiment.analyze(message);

        let sentimentLabel = 'Neutral';
        if (result.score > 0) sentimentLabel = 'Positive';
        else if (result.score < 0) sentimentLabel = 'Negative';

        const newFeedback = new Feedback({
            message,
            sentiment: sentimentLabel
        });

        await newFeedback.save();

        res.status(200).json({
            success: true,
            sentiment: sentimentLabel
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/feedback/summary
router.get('/summary', async (req, res) => {
    try {
        const positive = await Feedback.countDocuments({ sentiment: 'Positive' });
        const negative = await Feedback.countDocuments({ sentiment: 'Negative' });
        const neutral = await Feedback.countDocuments({ sentiment: 'Neutral' });

        res.json({
            positive,
            negative,
            neutral
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
