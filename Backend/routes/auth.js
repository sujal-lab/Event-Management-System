const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Approved admin emails (replace with your team's emails)
const ADMIN_EMAILS = [
    'sujalkandari11@gmail.com',
    'sidhant0785.becse24@chitkara.edu.in', 
    'simon0786.becse24@chitkara.edu.in',
    'saksham0750.becse24@chitkara.edu.in',
    'sujal0795.becse24@chitkara.edu.in'
];

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Hardcoded test user (now as attendee)
        if (email === "simon0786.becse24@chitkara.edu.in" && password === "test123") {
            const token = jwt.sign(
                { id: '1', role: 'attendee' }, // Added role to payload
                process.env.JWT_SECRET || 'superSecretKey',
                { expiresIn: '24h' }
            );
            
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {
                    id: '1',
                    email: email,
                    username: 'Sujal',
                    name: 'Sujal',
                    role: 'attendee', // Changed to attendee
                    token: token
                }
            });
        }

        // Normal user flow
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
                user: null
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
                user: null
            });
        }

        // Generate JWT token with role
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'superSecretKey',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name || user.username,
                role: user.role,
                token: token
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            user: null
        });
    }
});

// @route   POST /api/auth/register 
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Auto-assign role based on approved admin list
        const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'attendee';

        // Check if trying to register as admin when slots are full
        if (role === 'admin') {
            const adminCount = await User.countDocuments({ role: 'admin' });
            if (adminCount >= 5) {
                return res.status(403).json({
                    success: false,
                    message: 'Maximum admin limit reached'
                });
            }
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user with assigned role
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role
        });

        await user.save();

        // Generate token with role
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'superSecretKey',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed'
        });
    }
});

module.exports = router;