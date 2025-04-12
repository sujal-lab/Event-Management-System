const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/auth/login
// @desc    Authenticate user
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Hardcoded test user
        if (email === "sujal0795.becse24@chitkara.edu.in" && password === "test123") {
            const token = jwt.sign(
                { id: '1' },
                process.env.JWT_SECRET || 'superSecretKey',
                { expiresIn: '24h' }
            );
            
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {  // Token moved inside user object
                    id: '1',
                    email: email,
                    username: 'Sujal',
                    name: 'Sujal',
                    role: 'user',
                    token: token  // Token now inside user object
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

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'superSecretKey',
            { expiresIn: '24h' }
        );

        // Standardized response
        const userData = {
            id: user._id,
            email: user.email,
            username: user.username,
            name: user.name || user.username,
            role: user.role || 'user',
            token: token  // Token inside user object
        };

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userData  // Consistent structure
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
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user' // Default role
        });

        await user.save();

        // Generate token
        const token = jwt.sign(
            { id: user._id },
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
                token: token  // Token included in response
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