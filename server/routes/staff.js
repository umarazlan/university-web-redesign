const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JsonDb = require('../db/jsonDb');
const { protect, admin } = require('../middleware/authMiddleware');

const staffDb = new JsonDb('staff.json');
const attendanceDb = new JsonDb('staffAttendance.json');

const JWT_SECRET = process.env.JWT_SECRET || 'awkum_secret_key_123';

const generateToken = (id, role) => {
    return jwt.sign({ id, userType: 'staff', role }, JWT_SECRET, { expiresIn: '12h' });
};

// @route   POST /api/staff/login
// @desc    Staff Login
// @access  Public
router.post('/login', async (req, res) => {
    const { staffId, password } = req.body;

    // Supports login by Staff ID or Email
    const staffMembers = await staffDb.find();
    const user = staffMembers.find(s => s.staffId === staffId || s.email === staffId);

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            staffId: user.staffId,
            role: user.role,
            department: user.department,
            token: generateToken(user.id, user.role),
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// @route   POST /api/staff/create
// @desc    Create new Staff (Admin only)
// @access  Private/Admin
// Note: Requires Admin from main Auth (so the token must be an ADMIN token)
router.post('/create', protect, admin, async (req, res) => {
    const { name, email, staffId, department, role, password } = req.body;

    const staffMembers = await staffDb.find();
    if (staffMembers.find(s => s.email === email || s.staffId === staffId)) {
        return res.status(400).json({ message: 'Staff with this Email or ID already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStaff = {
        id: uuidv4(),
        name,
        email,
        staffId,
        department,
        role: role || 'Teacher', // Teacher, Coordinator, HOD
        status: 'Active',
        password: hashedPassword,
        dateJoined: new Date().toISOString(),
    };

    const created = await staffDb.create(newStaff);

    // Return without password
    const { password: _, ...responseData } = created;
    res.status(201).json(responseData);
});

// @route   GET /api/staff/me
// @desc    Get current staff profile
// @access  Private (Staff)
router.get('/me', protect, async (req, res) => {
    // req.user is set by protect middleware
    res.json(req.user);
});

// @route   GET /api/staff/attendance
// @desc    Get attendance records for current staff
// @access  Private (Staff)
router.get('/attendance', protect, async (req, res) => {
    const allAttendance = await attendanceDb.find();
    // Filter by staff ID
    const myAttendance = allAttendance.filter(a => a.staffId === req.user.id);
    res.json(myAttendance);
});

// @route   POST /api/staff/attendance
// @desc    Mark attendance (Admin/Coordinator)
// @access  Private (Admin/Coordinator) - For now Admin only for simplicity
router.post('/attendance', protect, admin, async (req, res) => {
    const { staffId, date, status } = req.body; // staffId here is the UUID

    const newRecord = {
        id: uuidv4(),
        staffId,
        date: date || new Date().toISOString().split('T')[0],
        status: status || 'Present', // Present, Absent, Leave
        markedBy: req.user.id,
        timestamp: new Date().toISOString()
    };

    const created = await attendanceDb.create(newRecord);
    res.status(201).json(created);
});

// @route   GET /api/staff
// @desc    Get all staff (Admin)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    const staff = await staffDb.find();
    // sanitize passwords
    const sanitized = staff.map(({ password, ...rest }) => rest);
    res.json(sanitized);
});

// @route   PUT /api/staff/:id
// @desc    Update Staff (Admin)
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    const { id } = req.params;
    const { name, email, staffId, department, role, password, status } = req.body;

    const staffMember = await staffDb.findById(id);
    if (!staffMember) {
        return res.status(404).json({ message: 'Staff member not found' });
    }

    // Check for duplicates if email/id changed
    const allStaff = await staffDb.find();
    const duplicate = allStaff.find(s =>
        (s.email === email || s.staffId === staffId) && s.id !== id
    );

    if (duplicate) {
        return res.status(400).json({ message: 'Email or Staff ID already in use' });
    }

    const updates = {
        name,
        email,
        staffId,
        department,
        role,
        status: status || staffMember.status
    };

    if (password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(password, salt);
    }

    const updated = await staffDb.update(id, updates);
    const { password: _, ...responseData } = updated;
    res.json(responseData);
});

// @route   DELETE /api/staff/:id
// @desc    Delete Staff (Admin)
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    const { id } = req.params;

    // Optional: Prevent deleting yourself
    if (req.user.id === id) {
        return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const success = await staffDb.delete(id);
    if (success) {
        res.json({ message: 'Staff member removed' });
    } else {
        res.status(404).json({ message: 'Staff member not found' });
    }
});


module.exports = router;
