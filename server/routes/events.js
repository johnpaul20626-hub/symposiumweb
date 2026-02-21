const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const upload = require('../config/multer');
const User = require('../models/User');

const EventModels = {
    'T-01': require('../models/Events/Presentation'),
    'T-02': require('../models/Events/AIHunt'),
    'T-03': require('../models/Events/Connection'),
    'T-04': require('../models/Events/ThreeDShow'),
    'T-05': require('../models/Events/Quiz'),
    'T-06': require('../models/Events/Presentation'),
    'N-01': require('../models/Events/ESportsPES'),
    'N-02': require('../models/Events/ESportsFreeFire'),
    'N-03': require('../models/Events/Carrom'),
    'N-04': require('../models/Events/StartMusic'),
    'N-05': require('../models/Events/Chess'),
    'N-06': require('../models/Events/CineQuiz'),
    'N-07': require('../models/Events/ThreeAFootball')
};

// Updated Event Data
const EVENTS = {
    'T-01': {
        name: 'Paper Presentation',
        fee: 100,
        type: 'Technical',
        coordinators: [
            { name: 'Allen Christopher', phone: '91503 25101' },
            { name: 'Samuel Joseph', phone: '' }
        ],
        image: '/assets/paper_presentation.jpg'
    },
    'T-02': {
        name: 'AI-Hunt',
        fee: 100,
        type: 'Technical',
        coordinators: [
            { name: 'Maria Juliana', phone: '63822 87627' },
            { name: 'Angelina Rochine', phone: '63806 81099' }
        ],
        image: '/assets/ai_hunt.jpg'
    },
    'T-03': {
        name: 'Connection',
        fee: 100,
        type: 'Technical',
        coordinators: [
            { name: 'John Paul', phone: '63854 23996' },
            { name: 'Salini', phone: '96005 31583' }
        ],
        image: '/assets/technical_event.jpg'
    },
    'T-04': {
        name: '3D-Show',
        fee: 100,
        type: 'Technical',
        coordinators: [
            { name: 'Kuralarasu', phone: '97515 92260' },
            { name: 'Sai Eswaran', phone: '' }
        ],
        image: '/assets/technical_event.jpg'
    },
    'T-05': {
        name: 'Quiz',
        fee: 100,
        type: 'Technical',
        coordinators: [
            { name: 'Yalini', phone: '90802 68792' },
            { name: 'Epsiba', phone: '63855 51062' }
        ],
        image: '/assets/technical_event.jpg'
    },

    // Non-Technical Events
    'N-01': {
        name: 'E-Sports (PES)',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Sanjay', phone: '' },
            { name: 'Thanislass James', phone: '' }
        ],
        image: '/assets/esports_event.jpg'
    },
    'N-02': {
        name: 'E-Sports (Free-Fire)',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Vibin Joseph', phone: '97862 54790' },
            { name: 'Sri Subahesan', phone: '' }
        ],
        image: '/assets/esports_event.jpg'
    },
    'N-03': {
        name: 'Carrom',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Mithun', phone: '73391 10775' },
            { name: 'Joel', phone: '93451 34454' }
        ],
        image: '/assets/non_technical_event.jpg'
    },
    'N-04': {
        name: 'Start Music',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Sharon', phone: '93429 26132' },
            { name: 'Saravanan', phone: '80725 63525' }
        ],
        image: '/assets/non_technical_event.jpg'
    },
    'N-05': {
        name: 'Chess',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Saran Raj', phone: '95858 70355' },
            { name: 'Daniel Prince', phone: '88254 45026' }
        ],
        image: '/assets/non_technical_event.jpg'
    },
    'N-06': {
        name: 'Cine Quiz',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Sharan R', phone: '63697 48808' },
            { name: 'Indija', phone: '94432 21554' }
        ],
        image: '/assets/non_technical_event.jpg'
    },
    'N-07': {
        name: '3A Football',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [],
        image: '/assets/non_technical_event.jpg'
    }
};

// Get All Events
router.get('/', (req, res) => {
    res.json(EVENTS);
});

// Get Database Statistics
router.get('/stats', async (req, res) => {
    try {
        const totalEvents = Object.keys(EVENTS).length;
        const totalRegistrations = await Registration.countDocuments();
        res.json({
            events: totalEvents,
            participants: totalRegistrations,
            prizePool: '₹20K+'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register for an event
router.post('/register', upload.single('paymentScreenshot'), async (req, res) => {
    // console.log("Body:", req.body);
    // console.log("File:", req.file);

    try {
        let {
            name, department, college, year, email, phoneNumber,
            eventCode, teamName, teamMembers, amountPaid
        } = req.body;

        if (!EVENTS[eventCode]) {
            return res.status(400).json({ message: 'Invalid Event Code' });
        }

        // Sanitize inputs to prevent case-sensitive duplicate bypasses
        email = email ? email.toLowerCase().trim() : '';
        phoneNumber = phoneNumber ? phoneNumber.trim().replace(/\s+/g, '') : '';

        // Check if already registered (Email OR Phone)
        const existingRegistration = await Registration.findOne({
            $or: [
                { email, eventCode },
                { phoneNumber, eventCode }
            ]
        });
        if (existingRegistration) {
            return res.status(400).json({ message: 'This email or phone number is already registered for this event' });
        }

        // 1. Find or Create User
        let user = await User.findOne({ $or: [{ email }, { phoneNumber }] });

        if (user) {
            // Update existing user details if needed, or just push event
            // Check if user already has this event in their list
            const alreadyRegistered = user.events.some(e => e.eventCode === eventCode);
            if (alreadyRegistered) {
                return res.status(400).json({ message: 'User already registered for this event' });
            }
            user.events.push({
                eventCode,
                eventName: EVENTS[eventCode].name
            });
            await user.save();
        } else {
            // Create new user
            user = await User.create({
                name, email, phoneNumber, department, college, year,
                events: [{
                    eventCode,
                    eventName: EVENTS[eventCode].name
                }]
            });
        }

        // 2. Create Registration Log
        const registration = await Registration.create({
            userId: user._id,
            name, department, college, year, email, phoneNumber,
            eventCode,
            teamName,
            teamMembers: teamMembers ? JSON.parse(teamMembers) : [],
            paymentStatus: 'pending',
            transactionId: `TXN_${Date.now()}`,
            amountPaid,
            paymentScreenshot: req.file ? `/uploads/${req.file.filename}` : null
        });

        // 3. Save to Specific Event Collection
        const EventModel = EventModels[eventCode];
        if (EventModel) {
            await EventModel.create({
                userId: user._id,
                name, department, email, phoneNumber,
                transactionId: registration.transactionId,
                paymentStatus: 'pending'
            });
        }

        res.status(201).json({ message: 'Registration Successful', registration });
    } catch (error) {
        console.error("Registration Error:", error);

        // Handle MongoDB Duplicate Key Error (e.g. if the user is already registered in the DB but state was out of sync, or race conditions)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You are already registered for this event.' });
        }

        res.status(500).json({ message: 'Registration Failed: ' + error.message });
    }
});

// Admin: Get all registrations
router.get('/admin/all-registrations', async (req, res) => {
    try {
        const registrations = await Registration.find();
        const enrichedRegistrations = registrations.map(reg => ({
            ...reg.toObject(),
            eventDetails: EVENTS[reg.eventCode]
        }));
        res.json(enrichedRegistrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
