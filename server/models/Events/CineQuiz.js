const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    department: { type: String },
    year: { type: String },
    college: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    paymentMode: { type: String, enum: ['online', 'spot'], default: 'online' },
    transactionId: { type: String },
    teamMembers: [String],
    registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CineQuiz', schema);
