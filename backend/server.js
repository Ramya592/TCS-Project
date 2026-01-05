const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/feedback', feedbackRoutes);

// MongoDB connection
mongoose.connect(
    process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedbackDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
