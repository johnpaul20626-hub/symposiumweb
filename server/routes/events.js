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
        fee: 50,
        type: 'Technical',
        coordinators: [
            { name: 'Allen Christopher', phone: '91503 25101' },
            { name: 'Samuel Joseph', phone: '63692 01696' }
        ],
        image: '/assets/paper_presentation.jpg',
        location: 'IT SMART CLASS/LAB',
        day: 'Day 1',
        rules: [
            "Punctuality: Presenters must arrive 15 minutes before their scheduled time.",
            "Time Limit: 10 minutes for presentation followed by 5 minutes Q&A.",
            "Originality: All presentations must be original; plagiarism leads to disqualification.",
            "Materials: Submit slides and supporting materials in advance for approval.",
            "Professional Conduct: Maintain professional behaviour and avoid inappropriate content.",
            "Judging & Awards: Evaluation is based on content, clarity, delivery, engagement, and time management. Best presentations will be awarded.",
            "Final Decision & Queries: Judges' decision is final. For questions, contact the event coordinator."
        ]
    },
    'T-02': {
        name: 'AI-Hunt',
        fee: 50,
        type: 'Technical',
        coordinators: [
            { name: 'Maria Juliana', phone: '63822 87627' },
            { name: 'Angelina Roshini', phone: '63806 81099' }
        ],
        image: '/assets/ai_hunt.jpg',
        location: 'ENTRANCE OF DEPT/ LAB',
        day: 'Day 1',
        rules: [
            "Teams of 3–5 members. Only one mobile per team for scanning QR codes.",
            "Start from the first QR code given at the starting point. Each code reveals a clue leading to the next location. Follow the sequence strictly.",
            "No skipping, no sharing answers, no forwarding QR links. Any unfair practice leads to disqualification.",
            "Time limit applies. The team that completes all checkpoints first with correct answers wins. If time ends, the team that reached the most checkpoints wins.",
            "No running in restricted areas, no damaging QR codes, and maintain discipline across campus.",
            "Final checkpoint verification is mandatory to confirm completion."
        ]
    },
    'T-03': {
        name: 'Connection',
        fee: 50,
        type: 'Technical',
        coordinators: [
            { name: 'John Paul', phone: '63854 23996' },
            { name: 'Salini', phone: '96005 31583' }
        ],
        image: '/assets/paper_presentation.jpg',
        location: 'EEE SEMINAR HALL',
        day: 'Day 1',
        rules: [
            "Each team gets limited time",
            "No mobile phones allowed",
            "No help from audience",
            "First answer is final",
            "No second chance after wrong answer",
            "Teams which scores maximum points will go to the next round",
            "Judge decision is final",
            "Use buzzer / raise hand system"
        ]
    },
    'T-04': {
        name: '3D-Show',
        fee: 50,
        type: 'Technical',
        coordinators: [
            { name: 'Kuralarasu', phone: '97515 92260' },
            { name: 'Sai Eswaran', phone: '96775 40616' }
        ],
        image: '/assets/ai_hunt.jpg',
        location: 'Ai&ds smart room',
        day: 'Day 1',
        rules: [
            "Sit properly: Take your designated seat and ensure you're comfortable.",
            "Maintain silence: Keep noise levels down during the presentation.",
            "3D glasses: Collect 3D glasses before the show and return them after it's over.",
            "Respect equipment: Handle 3D glasses and other equipment with care."
        ]
    },
    'T-05': {
        name: 'Quiz',
        fee: 50,
        type: 'Technical',
        coordinators: [
            { name: 'Yalini', phone: '90802 68792' },
            { name: 'Epsiba', phone: '63855 51062' }
        ],
        image: '/assets/paper_presentation.jpg',
        location: 'Hall 10',
        day: 'Day 1',
        rules: [
            "Team Formation: Participants can play individually or in teams (2–4 members). Teams must register before the quiz starts.",
            "Quiz Format: The quiz will have different rounds, such as General Knowledge, Technical / Subject-based.",
            "Question Rules: The quizmaster will read the question only once. Teams get 30 seconds to answer.",
            "Scoring System: Correct answer (+10), Wrong answer (–5), No answer (0). Questions may be passed.",
            "Discipline Rules: Participants must maintain silence. No arguing with the quizmaster.",
            "No use of mobile phones or internet.",
            "No discussion with the audience. The quizmaster's decision is final."
        ]
    },

    // Non-Technical Events
    'N-01': {
        name: 'E-Sports (PES)',
        fee: 50,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Sanjay', phone: '93456 52079' },
            { name: 'Thanislass James', phone: '97517 63724' }
        ],
        image: '/assets/ai_hunt.jpg',
        location: '3rd yr ai&ds class',
        day: 'Day 2',
        rules: [
            "The tournament will use the latest version of eFootball on the specified platform.",
            "Matches will be 1 vs 1 knockout format (may change based on participants).",
            "Match duration: 6 minutes per half, Professional/Top Player difficulty.",
            "Extra time and penalties will be used if the match ends in a draw.",
            "Players can choose any club or national team; duplicate teams are not allowed.",
            "Only default squads are allowed; no edited or custom players.",
            "Maximum 3 pauses per match, each up to 60 seconds; no pausing during opponent attack.",
            "Players must report 10 minutes before the match; late arrival leads to disqualification.",
            "Cheating, glitches, or misconduct will result in immediate disqualification.",
            "Organizers' decision is final."
        ]
    },
    'N-02': {
        name: 'E-Sports (Free-Fire)',
        fee: 50,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Vibin Joseph', phone: '97862 54790' },
            { name: 'Sri Subanesan', phone: '77081 56638' }
        ],
        image: '/assets/paper_presentation.jpg',
        location: '3rd yr ai&ds class',
        day: 'Day 2',
        rules: [
            "No hacks or third-party apps allowed.",
            "Teams must have at least 4 players to start a match.",
            "No player can be part of multiple teams.",
            "Teams must report to the venue on time."
        ]
    },
    'N-03': {
        name: 'Carrom',
        fee: 50,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Mithun', phone: '73391 10775' },
            { name: 'Joel Devanesan', phone: '93451 34454' }
        ],
        image: '/assets/ai_hunt.jpg',
        location: '2nd yr ai&ds class/ai&ds lab',
        day: 'Day 2',
        rules: [
            "Disturbing the coins while playing cause foul.",
            "For each foul 1 coin will be retained to the board.",
            "Points are not considered.",
            "Knockouts format.",
            "No consideration of suisidal points.",
            "Until the opponents appeal the foul that is not considered.",
            "After the first round over Re-entry will be closed."
        ]
    },
    'N-04': {
        name: 'Start Music',
        fee: 50,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Sowmiya', phone: '94886 87566' },
            { name: 'Saravanan', phone: '80725 63525' }
        ],
        image: '/assets/paper_presentation.jpg',
        location: 'Ai&ds class no:11',
        day: 'Day 2',
        rules: [
            "Listen carefully to the music or the given centre (middle) line.",
            "Identify the correct song based on the tune or lyrics.",
            "Start singing the song quickly without delay.",
            "Maintain the correct tune, rhythm, and lyrics while singing.",
            "Do not change the song or make mistakes in the words or melody. 🎵"
        ]
    },
    'N-05': {
        name: 'Chess',
        fee: 50,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Saran Raj', phone: '95858 70355' },
            { name: 'Daniel Prince', phone: '88254 45026' }
        ],
        image: '/assets/ai_hunt.jpg',
        location: '2nd yr ai&ds class/ai&ds lab',
        day: 'Day 2',
        rules: [
            "Open to all registered participants. Individual participation only.",
            "Tournament follows knockout format (winner advances, loser eliminated).",
            "Games follow standard rules of FIDE.",
            "White moves first.",
            "Phones or external assistance are not allowed.",
            "Only legal moves are allowed; illegal moves may result in penalties or loss.",
            "If a game ends in a draw, a tie-breaker game will decide the winner.",
            "Arbiter / judge decision is final."
        ]
    },
    'N-06': {
        name: 'Cine Quiz',
        fee: 50,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Sharan R', phone: '63697 48808' },
            { name: 'Induja', phone: '94432 21554' }
        ],
        image: '/assets/paper_presentation.jpg',
        location: 'Ai&ds smart class',
        day: 'Day 2',
        rules: [
            "Eligibility: Open to all registered participants. Individuals or teams (2–3 members) can participate.",
            "Scoring: Each correct answer earns 10 points.",
            "Time Limit: Teams must answer within the given time for each round.",
            "Fair Play: Mobile phones or external help are not allowed. Cheating leads to disqualification.",
            "Tie-Breaker: If scores are equal, a tie-breaker round will decide the winner.",
            "Authority: The quizmaster’s decision is final."
        ]
    },
    'N-07': {
        name: '3A Football',
        fee: 50,
        type: 'Non-Technical',
        coordinators: [
            { name: 'Denilson pinto', phone: '82489 76952' },
            { name: 'Sivaranganath', phone: '93600 19141' }
        ],
        image: '/assets/ai_hunt.jpg',
        location: 'College ground',
        day: 'Day 2',
        rules: [
            "Only college students are eligible to participate.",
            "Each team must consist of 3 players + 2 substitutes.",
            "Matches will follow a knockout format.",
            "Match Duration: 7 minutes first half + 7 minutes second half.",
            "Half-time break: 2 minutes between halves.",
            "Valid college ID must be shown during the event.",
            "Entry Fee: ₹150 per team.",
            "Referee’s decision will be final in all matches.",
            "Teams must report on time or may face disqualification.",
            "Unsportsmanlike behavior will lead to disqualification."
        ]
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
            prizePool: '₹12K+'
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
            eventCodes, teamName, teamMembers, amountPaid, transactionId, paymentMode
        } = req.body;

        console.log("RECEIVED TEAM MEMBERS FROM CLIENT:", teamMembers, "TYPE IS ARRAY:", Array.isArray(teamMembers));

        if (paymentMode === 'online' && !transactionId) {
            return res.status(400).json({ message: 'Transaction ID is required for online verification.' });
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
            paymentMode: paymentMode,
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
                        name, department, college, year, email, phoneNumber,
                        transactionId: registration.transactionId,
                        paymentStatus: 'pending',
                        paymentMode: paymentMode,
                        teamMembers: Array.isArray(teamMembers) ? teamMembers : []
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
