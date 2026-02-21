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
    eventCode: {
        type: String,
        required: true,
        enum: [
            'T-01', 'T-02', 'T-03', 'T-04', 'T-05', 'T-06',
            'N-01', 'N-02', 'N-03', 'N-04', 'N-05', 'N-06', 'N-07'
        ]
    },
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

// Prevent duplicate registration for the same event by the same email
// Prevent duplicate registration for the same event by the same email OR phone number
registrationSchema.index({ email: 1, eventCode: 1 }, { unique: true });
registrationSchema.index({ phoneNumber: 1, eventCode: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
