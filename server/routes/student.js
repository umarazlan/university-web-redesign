const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const JsonDb = require('../db/jsonDb');
const { protect } = require('../middleware/authMiddleware');

const applicantsDb = new JsonDb('applicants.json');
const meritListsDb = new JsonDb('meritLists.json');

// @route   POST /api/student/apply
// @desc    Authenticated student applies for a program
// @access  Private (Student)
router.post('/apply', protect, async (req, res) => {
    try {
        // User is attached to req.user by middleware
        const userId = req.user.id;
        const { program, fatherName, cnic, academicScore } = req.body;

        // Validation
        if (!program || !cnic) {
            return res.status(400).json({ message: 'Program and CNIC are required' });
        }

        // Check if already applied (optional logic, preventing duplicates for same program)
        const apps = await applicantsDb.find();
        const existing = apps.find(a => a.userId === userId && a.program === program);
        if (existing) {
            return res.status(400).json({ message: 'You have already applied for this program.' });
        }

        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 30); // Valid for 30 days

        const newApplication = {
            id: uuidv4(),
            userId,           // Link to logged in user
            name: req.user.name || 'Unknown', // Fallback or fetch from userDb if name not in token
            fatherName,
            cnic,
            program,
            testScore: 0, // Admin will add this later
            academicScore: parseFloat(academicScore) || 0,
            appliedDate: new Date().toISOString(),
            validUntil: validUntil.toISOString(),
            status: 'Pending'
        };

        const created = await applicantsDb.create(newApplication);
        res.status(201).json(created);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/student/merit-status
// @desc    Check merit status for logged in user
// @access  Private (Student)
router.get('/merit-status', protect, async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Find user's applications
        const allApplicants = await applicantsDb.find();
        const userApplications = allApplicants.filter(a => a.userId === userId);

        if (userApplications.length === 0) {
            return res.json({ hasApplied: false });
        }

        // 2. For each application, check if a merit list exists and if they are selected
        const allMeritLists = await meritListsDb.find();

        const results = userApplications.map(app => {
            // Find latest merit list for this program
            const programLists = allMeritLists
                .filter(l => l.program === app.program)
                .sort((a, b) => new Date(b.generatedDate) - new Date(a.generatedDate)); // Latest first

            const latestList = programLists[0];

            let meritStatus = 'Pending';
            let position = null;
            let listTitle = null;

            if (latestList) {
                // Check if student is in the list
                // We match by ID or CNIC. Since logic links by generic 'applicants' add, 
                // generating list simply copies applicant data. 
                // Ideally, we match by ID.
                const index = latestList.list.findIndex(item => item.id === app.id || item.cnic === app.cnic);

                if (index !== -1) {
                    meritStatus = 'Selected'; // Or we can refine this based on list logic (cut-off)
                    position = index + 1;
                    listTitle = latestList.title;
                } else {
                    meritStatus = 'Not Selected'; // In list but not found (or logic implies waiting)
                }
            }

            return {
                program: app.program,
                appliedDate: app.appliedDate,
                validUntil: app.validUntil,
                testScore: app.testScore,
                academicScore: app.academicScore,
                meritStatus,
                position,
                meritListTitle: listTitle
            };
        });

        res.json({ hasApplied: true, applications: results });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
