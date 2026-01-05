const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    user_id: {
        type: String,
        default: 'Guest'
    },
    message: {
        type: String,
        required: true
    },
    sentiment: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
