const express = require('express');
const router = express.Router();
const Update = require('../models/Update');
const { generateResponse } = require('../utils/openRouterClient');

// @route   GET api/summary
// @desc    Get AI-generated summary of updates from the last 24 hours using OpenRouter
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Get updates from the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const updates = await Update.find({
      timestamp: { $gte: oneDayAgo }
    }).sort({ timestamp: -1 });

    if (updates.length === 0) {
      return res.status(404).json({ msg: 'No updates found in the last 24 hours' });
    }

    // Format updates for summarization
    const updateTexts = updates.map(update => {
      return `${update.user}: ${update.title} - ${update.content}`;
    }).join('\n');

    // Create a prompt for the OpenRouter model
    const prompt = `Please provide a concise summary of the following team updates from the last 24 hours:\n\n${updateTexts}\n\nSummary:`;

    // Generate summary using OpenRouter
    const summaryText = await generateResponse(prompt);

    res.json({ summary: summaryText, updateCount: updates.length });
  } catch (err) {
    console.error('Summary generation error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;