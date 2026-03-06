import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaShoppingCart, FaTimes, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';

const EVENT_RULES = {
    'Chess': `**Rules:**
• The objective of the game is to checkmate the opponent’s king.
• The chessboard has 64 squares arranged in an 8×8 grid.
• Each player starts with 16 pieces: 1 King, 1 Queen, 2 Rooks, 2 Bishops, 2 Knights, 8 Pawns
• **King** – Moves one square in any direction.
• **Queen** – Moves any number of squares in any direction.
• **Rook** – Moves horizontally or vertically.
• **Bishop** – Moves diagonally.
• **Knight** – Moves in an L-shape.
• **Pawn** – Moves forward one square (two squares on first move) and captures diagonally.
• The player who checkmates the opponent’s king wins the match.`,

    'Carrom': `**Common Rules:**
• Disturbing the coins while playing will be considered a foul.
• For each foul, one coin will be returned to the board.
• Points are not considered.
• Potting the opponent’s coin when the last coin is left will be considered a loss.
• Matches will be conducted in knockout format.

**Doubles:**
• Thumbing is not allowed.

**Singles:**
• Thumbing is allowed if both players agree.`,

    'Quiz': `**Team Formation:**
• Participants can play individually or in teams (2–4 members).
• Each team must choose a team name and register before the quiz begins.

**Quiz Format:**
• The quiz will contain different rounds such as General Knowledge & Technical / Subject-based Round.
• Each round will have a fixed number of questions.

**Question Rules:**
• The quizmaster will read each question only once.
• Teams will get 30 seconds to answer.
• Mobile phones and internet usage are strictly prohibited.
• No discussion with the audience.

**Scoring System:**
• Correct answer → +10 marks
• Wrong answer → –5 marks
• No answer → 0 marks
• Unanswered questions may be passed to another team.

**Discipline:**
• Participants must maintain silence, no arguments. The quizmaster’s decision is final.`,

    'Cine Quiz': `**Eligibility:**
• Open to all registered participants.
• Participants can play individually or in teams (2–3 members).

**Quiz Format:**
• 🎥 Visual Round (identify movie/actor)
• 🎧 Audio Round (identify song/dialogue)
• ⚡ Rapid Fire Round
• ❓ Direct Question Round

**Scoring:**
• Correct answer → +10 points.
• Wrong answer → –5 points (depending on the round).
• Passed questions may be answered by other teams for bonus points.`,

    'Connection': `**Rules:**
• Participants must raise their hand to answer.
• The team that raises their hand first gets the chance to answer.
• Teams must identify the connection between the given clues.
• The team scoring the maximum points wins.`,

    'AI-Hunt': `**Rules:**
• Teams must consist of 3–5 members.
• Only one mobile phone per team is allowed for scanning QR codes.
• Start from the first QR code at the starting point.
• Each QR code reveals a clue to the next location.
• Skipping checkpoints or sharing answers is strictly prohibited.
• Any unfair practice will lead to disqualification.
• The team that completes all checkpoints first wins.
• If time ends, the team with the most completed checkpoints wins.
• Participants must follow campus discipline and avoid damaging QR codes.
• Final checkpoint verification is mandatory.`,

    'E-Sports (Free-Fire)': `**Rules:**
• Mobile-only tournament.
• Game mode: Battle Royale.
• No hacks or cheats allowed.
• No glitch exploitation.
• Tournament will be conducted in E-sports mode.
• The last surviving player/team becomes the champion.`,

    'E-Sports (PES)': `**Rules:**
• All participants must have updated eFootball by Konami installed.
• The organizer will create a Friend Match Room before the match.
• The Room ID will be shared only with selected players.
• Match duration (half length) will be decided before the game.
• Extra time and penalties will be enabled if required.
• Players must select teams on time.
• Standard football rules like offside, fouls, and cards apply.
• Players must ensure a stable internet connection.
• Fair play must be maintained; intentional disconnection is not allowed.
• Match results will be recorded after completion.`,

    '3D-Show': `**Rules:**
• Participants must sit in their designated seats.
• Maintain silence during the presentation.
• Collect 3D glasses before the show.
• Return the glasses after the show.
• Handle all equipment carefully.`
};

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [activeRuleModal, setActiveRuleModal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
                const eventList = Object.entries(res.data).map(([code, details]) => ({
                    code,
                    ...details
                }));
                setEvents(eventList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching events:", error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const toggleEvent = (event) => {
        if (selectedEvents.some(e => e.code === event.code)) {
            setSelectedEvents(selectedEvents.filter(e => e.code !== event.code));
        } else {
            if (selectedEvents.length >= 12) {
                alert("Maximum 12 events can be selected per pass.");
                return;
            }
            setSelectedEvents([...selectedEvents, event]);
        }
    };

    const proceedToRegistration = () => {
        if (selectedEvents.length === 0) return;
        // Navigate passing selected events via state
        navigate('/register/bundle', { state: { selectedEvents } });
    };

    const filteredEvents = filter === 'All' ? events : events.filter(e => e.type === filter);

    return (
        <div className="min-h-screen bg-deep-blue text-white relative overflow-hidden">
            <Navbar />

            {/* Background elements - Optimized for mobile performance without massive blurs */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full z-0"
                    style={{ background: 'radial-gradient(circle, rgba(0,243,255,0.05) 0%, rgba(0,243,255,0) 70%)' }}
                />
                <div
                    className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full z-0"
                    style={{ background: 'radial-gradient(circle, rgba(188,19,254,0.05) 0%, rgba(188,19,254,0) 70%)' }}
                />
            </div>

            <div className="pt-32 pb-20 container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="text-5xl md:text-7xl font-black font-gaming mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-neon-purple drop-shadow-[0_0_20px_rgba(0,243,255,0.6)]"
                    >
                        EVENT REGISTRATION
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {['All', 'Technical', 'Non-Technical'].map((cat, i) => (
                            <motion.button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-colors duration-300 border relative overflow-hidden backdrop-blur-md ${filter === cat
                                    ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.3)]'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-neon-cyan/50 hover:text-white'
                                    }`}
                            >
                                <span className="relative z-10">{cat}</span>
                                {filter === cat && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 z-0"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>

                {/* Sticky Liquid Registration Cart (iOS 26 Style) */}
                <AnimatePresence>
                    {selectedEvents.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="sticky top-24 z-50 mb-12 mx-auto max-w-4xl w-full"
                        >
                            <div className="relative p-[1px] rounded-[32px] bg-gradient-to-r from-neon-cyan via-purple-500 to-neon-cyan bg-[length:200%_auto] animate-gradient shadow-[0_15px_50px_rgba(0,243,255,0.3)] group overflow-hidden">
                                {/* Liquid background shimmer behind cart */}
                                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>

                                <div className="relative bg-black/70 backdrop-blur-2xl px-6 py-5 md:px-8 md:py-6 rounded-[31px] flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                                    <div className="flex-1 w-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <FaShoppingCart className="text-neon-cyan text-2xl" />
                                            <h2 className="text-white font-bold font-gaming tracking-wider text-xl">MISSION CART</h2>
                                            <span className="bg-neon-cyan/20 text-neon-cyan px-3 py-1 rounded-md text-sm sm:text-base font-bold font-mono shadow-[0_0_10px_rgba(0,243,255,0.3)] border border-neon-cyan/30">
                                                {selectedEvents.length}/12 SELECTED
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-3 max-h-[120px] overflow-y-auto no-scrollbar pr-2 py-1">
                                            <AnimatePresence>
                                                {selectedEvents.map(ev => (
                                                    <motion.div
                                                        key={ev.code}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0 }}
                                                        className="bg-neon-purple/20 border border-neon-purple/60 px-4 py-2 rounded-full flex items-center gap-2 text-sm sm:text-base font-bold text-white shadow-[0_0_15px_rgba(188,19,254,0.4)]"
                                                    >
                                                        {ev.name}
                                                        <button onClick={() => toggleEvent(ev)} className="hover:text-red-400 select-none ml-1 transition-colors"><FaTimes size={16} /></button>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center gap-6 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                                        <div className="flex flex-col">
                                            <span className="text-gray-400 text-xs font-mono uppercase">Total Pass Fee</span>
                                            <span className="text-neon-cyan font-black text-3xl">₹{selectedEvents.length === 1 && ['N-01', 'N-02', 'N-07'].includes(selectedEvents[0].code) ? 150 : 200}</span>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={proceedToRegistration}
                                            className="bg-neon-cyan text-black px-8 py-3 rounded-2xl font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)] flex items-center gap-2 flex-1 md:flex-none justify-center whitespace-nowrap overflow-hidden relative group/btn"
                                        >
                                            <span className="relative z-10">PROCEED</span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-[0%] transition-transform duration-300"></div>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredEvents.map((event, index) => {
                                const isSelected = selectedEvents.some(e => e.code === event.code);

                                return (
                                    <motion.div
                                        key={event.code}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 250,
                                            damping: 25,
                                            delay: index * 0.05
                                        }}
                                        whileHover={{ scale: 1.02, y: -10, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                                        className={`group relative backdrop-blur-2xl border-2 rounded-2xl overflow-hidden transition-all duration-500 shadow-xl ${isSelected
                                            ? 'bg-neon-cyan/5 border-neon-cyan shadow-[0_0_30px_rgba(0,243,255,0.2)]'
                                            : 'bg-midnight/40 border-white/10 hover:border-neon-cyan/50 hover:shadow-[0_0_40px_rgba(0,243,255,0.2)]'
                                            }`}
                                    >
                                        {/* Liquid Glowing Background on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0 pointer-events-none"></div>

                                        {/* Animated Gaming Symbols */}
                                        <motion.div
                                            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className={`absolute -top-16 -right-16 w-40 h-40 border-[1px] rounded-full z-0 opacity-40 transition-all duration-700 pointer-events-none ${isSelected ? 'border-neon-cyan/60' : 'border-neon-cyan/20 group-hover:border-neon-cyan/60 group-hover:opacity-100'}`}
                                        />
                                        <motion.div
                                            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                            className={`absolute -bottom-16 -left-16 w-48 h-48 border-[1px] rounded-lg z-0 opacity-40 transition-all duration-700 pointer-events-none ${isSelected ? 'border-neon-purple/60' : 'border-neon-purple/20 group-hover:border-neon-purple/60 group-hover:opacity-100'}`}
                                        />

                                        <div className="h-48 relative overflow-hidden z-10">
                                            {/* Image */}
                                            {event.image && (
                                                <img
                                                    src={event.image}
                                                    alt={event.name}
                                                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}
                                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                                                />
                                            )}

                                            {/* Fallback & Overlay */}
                                            <div className={`absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/50 to-transparent ${event.image ? '' : 'flex'} flex-col justify-end p-6`}>
                                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-neon-cyan/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                                                    {event.type}
                                                </div>
                                                {isSelected && (
                                                    <div className="absolute top-4 left-4 bg-neon-cyan text-black px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 shadow-[0_0_15px_rgba(0,243,255,0.6)]">
                                                        <FaCheck /> ADDED
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-6 relative z-10 bg-[#05070f]/80 backdrop-blur-sm h-full rounded-b-2xl">
                                            <h3 className={`text-2xl font-black font-gaming mb-2 transition-colors truncate ${isSelected ? 'text-neon-cyan' : 'text-white group-hover:text-neon-cyan'}`}>
                                                {event.name}
                                            </h3>
                                            <div className={`h-0.5 bg-neon-purple mb-4 transition-all duration-500 ${isSelected ? 'w-full' : 'w-12 group-hover:w-full'}`}></div>

                                            <div className="flex justify-between items-center mb-4 text-sm text-gray-300 font-mono">
                                                <span>LOCATION</span>
                                                <a
                                                    href="https://maps.app.goo.gl/YRpo99N7d8Anh75m6"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-neon-cyan font-bold text-md hover:underline decoration-neon-cyan underline-offset-4"
                                                >
                                                    AI DS dept
                                                </a>
                                            </div>

                                            <div className="mb-4">
                                                <span className="text-sm text-gray-400 font-mono block mb-2">COORDINATORS</span>
                                                {event.coordinators && event.coordinators.length > 0 ? (
                                                    <div className="flex flex-col gap-1">
                                                        {event.coordinators.map((coord, i) => (
                                                            <div key={i} className="text-sm font-bold text-white flex justify-between">
                                                                <span>{coord.name}</span>
                                                                <span className="text-gray-400">{coord.phone || 'N/A'}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-500 italic">To be announced</span>
                                                )}
                                            </div>

                                            <div className="flex gap-2 mt-auto pt-2">
                                                <button
                                                    onClick={() => toggleEvent(event)}
                                                    className={`flex-1 py-3 font-bold text-center rounded-xl transition-all duration-300 uppercase tracking-widest relative overflow-hidden group/btn shadow-[0_0_15px_rgba(0,0,0,0.5)] text-sm sm:text-base ${isSelected
                                                        ? 'bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white'
                                                        : 'bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_25px_rgba(0,243,255,0.5)]'
                                                        }`}
                                                >
                                                    <span className="relative z-10 transition-colors duration-300 flex items-center justify-center gap-2">
                                                        {isSelected ? <><FaTimes /> REMOVE</> : <><FaShoppingCart /> ADD EVENT</>}
                                                    </span>
                                                    {!isSelected && <div className="absolute inset-0 bg-neon-cyan translate-y-[100%] group-hover/btn:translate-y-[0%] transition-transform duration-300 ease-out z-0"></div>}
                                                </button>

                                                {EVENT_RULES[event.name] && (
                                                    <button
                                                        onClick={() => setActiveRuleModal({ name: event.name, type: event.type })}
                                                        className="px-4 py-3 bg-white/5 border border-white/20 text-white rounded-xl hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                                                        title="Read Rules"
                                                    >
                                                        <FaInfoCircle className="text-xl" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Rules Modal */}
            <AnimatePresence>
                {activeRuleModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setActiveRuleModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative w-full max-w-2xl bg-midnight/90 border-2 rounded-3xl overflow-hidden shadow-2xl ${activeRuleModal.type === 'Technical'
                                ? 'border-neon-cyan/50 shadow-[0_0_50px_rgba(0,243,255,0.3)]'
                                : 'border-neon-purple/50 shadow-[0_0_50px_rgba(188,19,254,0.3)]'
                                }`}
                        >
                            {/* Modal Header */}
                            <div className={`p-6 md:p-8 border-b flex justify-between items-center bg-gradient-to-r ${activeRuleModal.type === 'Technical'
                                ? 'from-neon-cyan/20 to-transparent border-neon-cyan/30'
                                : 'from-neon-purple/20 to-transparent border-neon-purple/30'
                                }`}>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-black font-gaming tracking-wider text-white flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                        <FaInfoCircle className={activeRuleModal.type === 'Technical' ? 'text-neon-cyan' : 'text-neon-purple'} />
                                        {activeRuleModal.name}
                                    </h2>
                                    <p className={`text-sm font-mono mt-2 ${activeRuleModal.type === 'Technical' ? 'text-neon-cyan/80' : 'text-neon-purple/80'}`}>
                                        RULES & REGULATIONS
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActiveRuleModal(null)}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                <div className="space-y-4 text-gray-300 font-sans leading-relaxed text-sm md:text-base">
                                    {EVENT_RULES[activeRuleModal.name]?.split('\n').map((line, idx) => {
                                        if (line.startsWith('**') && line.endsWith('**')) {
                                            return <h4 key={idx} className={`text-lg font-bold mt-6 mb-2 ${activeRuleModal.type === 'Technical' ? 'text-neon-cyan' : 'text-neon-purple'}`}>{line.replace(/\*\*/g, '')}</h4>;
                                        }
                                        if (line.startsWith('•')) {
                                            return (
                                                <div key={idx} className="flex gap-3 items-start p-2 hover:bg-white/5 rounded-lg transition-colors">
                                                    <span className={activeRuleModal.type === 'Technical' ? 'text-neon-cyan mt-1' : 'text-neon-purple mt-1'}>🎮</span>
                                                    <span dangerouslySetInnerHTML={{ __html: line.substring(1).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                                                </div>
                                            );
                                        }
                                        if (line.trim() === '') return <br key={idx} />;
                                        return <p key={idx}>{line}</p>;
                                    })}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className={`p-4 md:p-6 border-t flex justify-end bg-black/40 ${activeRuleModal.type === 'Technical' ? 'border-neon-cyan/30' : 'border-neon-purple/30'
                                }`}>
                                <button
                                    onClick={() => setActiveRuleModal(null)}
                                    className={`px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-all ${activeRuleModal.type === 'Technical'
                                        ? 'bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-black border border-neon-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                                        : 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple hover:text-white border border-neon-purple/50 shadow-[0_0_15px_rgba(188,19,254,0.3)]'
                                        }`}
                                >
                                    Acknowledge
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Events;
