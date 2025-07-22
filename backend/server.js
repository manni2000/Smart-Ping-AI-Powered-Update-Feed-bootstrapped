const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-ping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
const updatesRoutes = require('./routes/updates');
const openRouterSummaryRoutes = require('./routes/summary');

// Use routes
app.use('/api/updates', updatesRoutes);
app.use('/api/summary', openRouterSummaryRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Smart Ping API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});