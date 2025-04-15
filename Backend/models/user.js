const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // This automatically creates a unique index
        max: 50,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        min: 6,
        select: false // Never return password in queries
    },
    role: {
        type: String,
        enum: ['admin', 'organizer', 'attendee'],
        default: 'attendee',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    lastLogin: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.password; // Never include password in JSON output
            delete ret.__v; // Remove version key
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

// Indexes for faster queries (removed duplicate email index)
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for user's display name
userSchema.virtual('displayName').get(function() {
    return this.name || this.username;
});

// Static method to count admins
userSchema.statics.countAdmins = async function() {
    return await this.countDocuments({ role: 'admin' });
};

module.exports = mongoose.model('User', userSchema);