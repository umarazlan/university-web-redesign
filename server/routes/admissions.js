const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const JsonDb = require('../db/jsonDb');
const { protect, admin } = require('../middleware/authMiddleware');

const admissionDb = new JsonDb('admissions.json');

// @route   GET /api/admissions
// @desc    Get all admissions
// @access  Public
router.get('/', async (req, res) => {
    try {
        const admissions = await admissionDb.find();
        res.json(admissions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/admissions
// @desc    Create admission cycle
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { title, department, deadline, criteria, status } = req.body;

        const newAdmission = {
            id: uuidv4(),
            title,
            department,
            deadline,
            criteria,
            status: status || 'Open',
            dateCreated: new Date().toISOString(),
        };

        const createdAdmission = await admissionDb.create(newAdmission);
        res.status(201).json(createdAdmission);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/admissions/:id
// @desc    Update admission
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const updated = await admissionDb.update(req.params.id, req.body);
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Admission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/admissions/:id
// @desc    Delete admission
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const success = await admissionDb.delete(req.params.id);
        if (success) {
            res.json({ message: 'Admission removed' });
        } else {
            res.status(404).json({ message: 'Admission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
