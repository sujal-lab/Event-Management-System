const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide email and password',
                user: null
            });
        }
        
        // DEVELOPMENT: Hardcoded test user
        if (email === "sujal0795.becse24@chitkara.edu.in" && password === "test123") {
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {
                    token: 'dummy-token-123',
                    id: '1',
                    email: email,
                    username: 'Sujal',
                    name: 'Sujal',
                    role: 'user'
                }
            });
        }

        // PRODUCTION: Database authentication
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found',
                user: null
            });
        }
        
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
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
        
        // Return standardized response
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                token: token,
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name || user.username,
                role: user.role || 'user'
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            user: null,
            error: error.message
        });
    }
};

// Registration controller
exports.register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        
        // Validate input
        if (!name || !email || !password || !username) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide all required fields',
                user: null
            });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: 'User already exists',
                user: null
            });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        const user = new User({
            name,
            email,
            username,
            password: hashedPassword,
            role: 'user' // Default role
        });
        
        await user.save();
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'superSecretKey',
            { expiresIn: '24h' }
        );
        
        // Return response matching login structure
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                token: token,
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            user: null,
            error: error.message
        });
    }
};