const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const JsonDb = require('../db/jsonDb');

const userDb = new JsonDb('users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'awkum_secret_key_123';

// Helper to generate token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '30d' });
};

// Initialize default admin
const initAdmin = async () => {
    const users = await userDb.read();
    const adminExists = users.find(u => u.email === 'admin@awkum.edu.pk');

    if (!adminExists) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin', salt); // Default password

        await userDb.create({
            id: '1',
            name: 'System Admin',
            email: 'admin@awkum.edu.pk',
            password: hashedPassword,
            role: 'admin'
        });
        console.log('Default admin created: admin@awkum.edu.pk / admin');
    }
};

initAdmin();

// @route   POST /api/auth/register
// @desc    Register a new user (Student)
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password, cnic } = req.body;

    try {
        console.log('Register request received:', req.body);
        if (!name || !email || !password || !cnic) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const users = await userDb.read();

        // Check for duplicates
        const userExists = users.find(u => u.email === email || u.cnic === cnic);
        if (userExists) {
            return res.status(400).json({ message: 'User with this Email or CNIC already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = {
            id: uuidv4(),
            name,
            email,
            cnic, // Store CNIC for lookup
            password: hashedPassword,
            role: 'student', // Default role
            createdAt: new Date().toISOString()
        };

        const createdUser = await userDb.create(newUser);

        if (createdUser) {
            res.status(201).json({
                _id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
                cnic: createdUser.cnic,
                role: createdUser.role,
                token: generateToken(createdUser.id, createdUser.role),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/auth/login
// @desc    Auth user & get token (Supports Email OR CNIC)
// @access  Public
router.post('/login', async (req, res) => {
    const { loginId, password } = req.body; // loginId can be email or cnic

    try {
        const users = await userDb.read();

        // Find by Email OR CNIC
        const user = users.find(u => u.email === loginId || u.cnic === loginId);

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
