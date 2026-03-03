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
        image: '/assets/paper_presentation.jpg'
    },
    'T-04': {
        name: '3D-Show',
        fee: 100,
        type: 'Technical',
        coordinators: [
            { name: 'Kuralarasu', phone: '97515 92260' },
            { name: 'Sai Eswaran', phone: '' }
        ],
        image: '/assets/ai_hunt.jpg'
    },
    'T-05': {
        name: 'Quiz',
        fee: 100,
        type: 'Technical',
        coordinators: [
            { name: 'Yalini', phone: '90802 68792' },
            { name: 'Epsiba', phone: '63855 51062' }
        ],
        image: '/assets/paper_presentation.jpg'
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
        image: '/assets/ai_hunt.jpg'
    },
    'N-02': {
        name: 'E-Sports (Free-Fire)',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Vibin Joseph', phone: '97862 54790' },
            { name: 'Sri Subahesan', phone: '' }
        ],
        image: '/assets/paper_presentation.jpg'
    },
    'N-03': {
        name: 'Carrom',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Mithun', phone: '73391 10775' },
            { name: 'Joel', phone: '93451 34454' }
        ],
        image: '/assets/ai_hunt.jpg'
    },
    'N-04': {
        name: 'Start Music',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Sharon', phone: '93429 26132' },
            { name: 'Saravanan', phone: '80725 63525' }
        ],
        image: '/assets/paper_presentation.jpg'
    },
    'N-05': {
        name: 'Chess',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Saran Raj', phone: '95858 70355' },
            { name: 'Daniel Prince', phone: '88254 45026' }
        ],
        image: '/assets/ai_hunt.jpg'
    },
    'N-06': {
        name: 'Cine Quiz',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Sharan R', phone: '63697 48808' },
            { name: 'Indija', phone: '94432 21554' }
        ],
        image: '/assets/paper_presentation.jpg'
    },
    'N-07': {
        name: '3A Football',
        fee: 100,
        type: 'Non-Technical',
        coordinators: [],
        image: '/assets/ai_hunt.jpg'
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
            prizePool: '₹5K+'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register for bundled events (Symposium Pass)
router.post('/register-bundle', async (req, res) => {
    try {
        let {
            name, department, college, year, email, phoneNumber,
            eventCodes, teamName, teamMembers, amountPaid, transactionId
        } = req.body;

        if (!transactionId) {
            return res.status(400).json({ message: 'Transaction ID is required for verification.' });
        }

        if (!eventCodes || !Array.isArray(eventCodes) || eventCodes.length === 0) {
            return res.status(400).json({ message: 'Please select at least one event.' });
        }

        if (eventCodes.length > 12) {
            return res.status(400).json({ message: 'Maximum 12 events can be selected.' });
        }

        // Validate all event codes
        for (const code of eventCodes) {
            if (!EVENTS[code]) {
                return res.status(400).json({ message: `Invalid Event Code: ${code}` });
            }
        }

        // Sanitize inputs
        email = email ? email.toLowerCase().trim() : '';
        phoneNumber = phoneNumber ? phoneNumber.trim().replace(/\s+/g, '') : '';

        // Check if already registered for the symposium (Duplicate Prevention across all events)
        const existingRegistration = await Registration.findOne({
            $or: [{ email }, { phoneNumber }]
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'A Symposium Pass is already registered under this email or phone number.' });
        }

        // 1. Find or Create User
        let user = await User.findOne({ $or: [{ email }, { phoneNumber }] });

        const mappedEvents = eventCodes.map(code => ({
            eventCode: code,
            eventName: EVENTS[code].name
        }));

        if (user) {
            // Overwrite or append events if user exists (edge case)
            const currentCodes = user.events.map(e => e.eventCode);
            eventCodes.forEach(code => {
                if (!currentCodes.includes(code)) {
                    user.events.push({ eventCode: code, eventName: EVENTS[code].name });
                }
            });
            await user.save();
        } else {
            // Create new user profile
            user = await User.create({
                name, email, phoneNumber, department, college, year,
                events: mappedEvents
            });
        }

        // 2. Create Master Registration Log
        const registration = await Registration.create({
            userId: user._id,
            name, department, college, year, email, phoneNumber,
            eventCodes, // Array
            teamName,
            teamMembers: Array.isArray(teamMembers) ? teamMembers : [],
            paymentStatus: 'pending',
            transactionId: transactionId,
            amountPaid
        });

        // 3. Save to Specific Event Collections individually
        const collectionPromises = eventCodes.map(async (code) => {
            const EventModel = EventModels[code];
            if (EventModel) {
                // Ignore duplicate errors inside individual collections if they somehow exist
                try {
                    await EventModel.create({
                        userId: user._id,
                        name, department, email, phoneNumber,
                        transactionId: registration.transactionId,
                        paymentStatus: 'pending'
                    });
                } catch (e) {
                    if (e.code !== 11000) console.error(`Failed to add user to Model ${code}`, e);
                }
            }
        });

        await Promise.all(collectionPromises);

        res.status(201).json({ message: 'Symposium Pass Secured Successfully', registration });
    } catch (error) {
        console.error("Bundle Registration Error:", error);

        if (error.code === 11000) {
            return res.status(400).json({ message: 'A Symposium Pass is already registered under this email or phone number.' });
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
