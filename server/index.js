const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure data and uploads directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/news', require('./routes/news'));
app.use('/api/admissions', require('./routes/admissions'));
app.use('/api/merit', require('./routes/merit'));
app.use('/api/student', require('./routes/student'));
app.use('/api/staff', require('./routes/staff'));

app.get('/', (req, res) => {
    res.json({ message: 'AWKUM API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
