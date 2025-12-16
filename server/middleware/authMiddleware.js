const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'awkum_secret_key_123';

const JsonDb = require('../db/jsonDb');
const usersDb = new JsonDb('users.json');
const staffDb = new JsonDb('staff.json');

const protect = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        let user;
        if (decoded.userType === 'staff') {
            user = await staffDb.findById(decoded.id);
        } else {
            // Default to student/admin users
            user = await usersDb.findById(decoded.id);
        }

        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

module.exports = { protect, admin };
