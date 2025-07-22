const express = require('express');
const router = express.Router();
const Update = require('../models/Update');

// @route   GET api/updates
// @desc    Get all updates
// @access  Public
router.get('/', async (req, res) => {
  try {
    const updates = await Update.find().sort({ timestamp: -1 });
    res.json(updates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/updates/search
// @desc    Search updates by keyword
// @access  Public
router.get('/search', async (req, res) => {
  const { keyword } = req.query;
  
  if (!keyword) {
    return res.status(400).json({ msg: 'Keyword is required' });
  }

  try {
    const updates = await Update.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { content: { $regex: keyword, $options: 'i' } },
        { user: { $regex: keyword, $options: 'i' } }
      ]
    }).sort({ timestamp: -1 });
    
    res.json(updates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/updates
// @desc    Create an update
// @access  Public
router.post('/', async (req, res) => {
  const { user, title, content } = req.body;

  // Simple validation
  if (!user || !title || !content) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const newUpdate = new Update({
      user,
      title,
      content
    });

    const update = await newUpdate.save();
    res.json(update);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/updates/:id
// @desc    Get update by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    
    if (!update) {
      return res.status(404).json({ msg: 'Update not found' });
    }
    
    res.json(update);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Update not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/updates/:id
// @desc    Update an existing update
// @access  Public
router.put('/:id', async (req, res) => {
  const { user, title, content } = req.body;

  // Simple validation
  if (!user || !title || !content) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    let update = await Update.findById(req.params.id);
    
    if (!update) {
      return res.status(404).json({ msg: 'Update not found' });
    }
    
    // Update the fields
    update.user = user;
    update.title = title;
    update.content = content;
    
    await update.save();
    res.json(update);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Update not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/updates/:id
// @desc    Delete an update
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    
    if (!update) {
      return res.status(404).json({ msg: 'Update not found' });
    }
    
    await update.remove();
    res.json({ msg: 'Update removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Update not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;