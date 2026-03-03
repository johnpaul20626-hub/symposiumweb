const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    // Participant Details
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    college: { type: String, required: true },
    year: {
        type: String,
        required: true,
        enum: ['I', 'II', 'III', 'IV']
    },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    // photoId removed as per user request

    // Event Details
    eventCodes: [{
        type: String,
        required: true
    }],
    teamName: { type: String }, // Required for team events
    teamMembers: [{
        name: String,
        college: String,
        email: String,
        phone: String
    }],
    submissionLink: { type: String }, // For Hackathon/Paper/Project

    // Payment Details
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    transactionId: { type: String },
    amountPaid: { type: Number, required: true },
    paymentScreenshot: { type: String }, // Path to uploaded file

    registeredAt: { type: Date, default: Date.now }
});

// Prevent duplicate registration for the entire symposium 
// A single person (email or phone) can only register one bundle pass.
registrationSchema.index({ email: 1 }, { unique: true });
registrationSchema.index({ phoneNumber: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
