const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const JsonDb = require('../db/jsonDb');
const { protect, admin } = require('../middleware/authMiddleware');

const applicantsDb = new JsonDb('applicants.json');
const meritListsDb = new JsonDb('meritLists.json');

// @route   GET /api/merit/applicants
// @desc    Get all applicants
// @access  Private/Admin
router.get('/applicants', protect, admin, async (req, res) => {
    try {
        const applicants = await applicantsDb.find();
        res.json(applicants.reverse());
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/merit/applicants
// @desc    Add applicant (Admin)
// @access  Private/Admin
router.post('/applicants', protect, admin, async (req, res) => {
    try {
        const { name, fatherName, cnic, program, testScore, academicScore } = req.body;

        const applicants = await applicantsDb.find();
        const existing = applicants.find(a => a.cnic === cnic && a.program === program);

        if (existing) {
            return res.status(400).json({ message: 'Applicant with this CNIC already exists in this program' });
        }

        const newApplicant = {
            id: uuidv4(),
            name,
            fatherName,
            cnic,
            program,
            testScore: parseFloat(testScore) || 0,
            academicScore: parseFloat(academicScore) || 0, // Out of 100/normalized
            appliedDate: new Date().toISOString(),
        };

        const created = await applicantsDb.create(newApplicant);
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/merit/applicants/:id
// @desc    Update applicant
// @access  Private/Admin
router.put('/applicants/:id', protect, admin, async (req, res) => {
    try {
        const { name, fatherName, cnic, program, testScore, academicScore } = req.body;

        const updates = {
            name,
            fatherName,
            cnic,
            program,
            testScore: parseFloat(testScore) || 0,
            academicScore: parseFloat(academicScore) || 0
        };

        const updated = await applicantsDb.update(req.params.id, updates);
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Applicant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/merit/applicants/:id
// @desc    Delete applicant
// @access  Private/Admin
router.delete('/applicants/:id', protect, admin, async (req, res) => {
    try {
        const success = await applicantsDb.delete(req.params.id);
        if (success) {
            res.json({ message: 'Applicant removed' });
        } else {
            res.status(404).json({ message: 'Applicant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/merit/applicants/:program
// @desc    Get applicants by program
// @access  Private/Admin
router.get('/applicants/:program', protect, admin, async (req, res) => {
    try {
        const applicants = await applicantsDb.find();
        const filtered = applicants.filter(a => a.program.toLowerCase() === req.params.program.toLowerCase());
        res.json(filtered);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/merit/generate
// @desc    Generate Merit List
// @access  Private/Admin
router.post('/generate', protect, admin, async (req, res) => {
    try {
        const { program, title, criteria } = req.body;
        // criteria: { testWeight: 50, academicWeight: 50 } (percentages)

        const applicants = await applicantsDb.find();
        const programApplicants = applicants.filter(a => a.program.toLowerCase() === program.toLowerCase());

        if (programApplicants.length === 0) {
            return res.status(400).json({ message: 'No applicants found for this program' });
        }

        const testWeight = (criteria?.testWeight || 50) / 100;
        const academicWeight = (criteria?.academicWeight || 50) / 100;

        const meritList = programApplicants.map(app => {
            const aggregate = (app.testScore * testWeight) + (app.academicScore * academicWeight);
            return {
                ...app,
                aggregate: aggregate.toFixed(2)
            };
        }).sort((a, b) => b.aggregate - a.aggregate);

        const newMeritList = {
            id: uuidv4(),
            title,
            program,
            generatedDate: new Date().toISOString(),
            list: meritList
        };

        const savedList = await meritListsDb.create(newMeritList);
        res.status(201).json(savedList);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/merit/lists
// @desc    Get all published merit lists
// @access  Public
router.get('/lists', async (req, res) => {
    try {
        const lists = await meritListsDb.find();
        res.json(lists.reverse());
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/merit/lists/:id
// @desc    Get specific merit list
// @access  Public
router.get('/lists/:id', async (req, res) => {
    try {
        const list = await meritListsDb.findById(req.params.id);
        if (list) {
            res.json(list);
        } else {
            res.status(404).json({ message: 'List not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
