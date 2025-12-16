const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const JsonDb = require('../db/jsonDb');
const { protect, admin } = require('../middleware/authMiddleware');

const newsDb = new JsonDb('news.json');

// @route   GET /api/news
// @desc    Get all news
// @access  Public
router.get('/', async (req, res) => {
    try {
        const news = await newsDb.find();
        res.json(news.reverse()); // Newest first
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/news/:id
// @desc    Get news by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const newsItem = await newsDb.findById(req.params.id);
        if (newsItem) {
            res.json(newsItem);
        } else {
            res.status(404).json({ message: 'News not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/news
// @desc    Create news
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { title, content, category, image } = req.body;

        const newNews = {
            id: uuidv4(),
            title,
            content,
            category,
            image: image || '',
            date: new Date().toISOString(),
        };

        const createdNews = await newsDb.create(newNews);
        res.status(201).json(createdNews);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/news/:id
// @desc    Update news
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const updated = await newsDb.update(req.params.id, req.body);
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({ message: 'News not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/news/:id
// @desc    Delete news
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const success = await newsDb.delete(req.params.id);
        if (success) {
            res.json({ message: 'News removed' });
        } else {
            res.status(404).json({ message: 'News not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
