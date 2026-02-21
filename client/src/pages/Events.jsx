import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('/server/symposium_api/api/events');
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

    const filteredEvents = filter === 'All' ? events : events.filter(e => e.type === filter);

    return (
        <div className="min-h-screen bg-deep-blue text-white relative overflow-hidden">
            <Navbar />

            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-cyan/5 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="pt-32 pb-20 container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -50, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
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
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.code}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, filter: "blur(15px)", y: 50 }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, filter: "blur(15px)", y: 50 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 250,
                                        damping: 25,
                                        delay: index * 0.05
                                    }}
                                    whileHover={{ scale: 1.02, y: -10, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                                    className="group relative bg-midnight/40 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden hover:border-neon-cyan transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(0,243,255,0.3)]"
                                >
                                    {/* Liquid Glowing Background on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0 pointer-events-none"></div>

                                    {/* Animated Gaming Symbols */}
                                    <motion.div
                                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute -top-16 -right-16 w-40 h-40 border-[1px] border-neon-cyan/20 rounded-full z-0 opacity-40 group-hover:border-neon-cyan/60 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute -bottom-16 -left-16 w-48 h-48 border-[1px] border-neon-purple/20 rounded-lg z-0 opacity-40 group-hover:border-neon-purple/60 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                                    />

                                    <div className="h-48 relative overflow-hidden z-10">
                                        {/* Image */}
                                        {event.image ? (
                                            <img
                                                src={event.image}
                                                alt={event.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                                            />
                                        ) : null}

                                        {/* Fallback & Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent ${event.image ? '' : 'flex'} flex-col justify-end p-6`}>
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-neon-cyan/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                                                {event.type}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 relative z-10">
                                        <h3 className="text-2xl font-black font-gaming text-white mb-2 group-hover:text-neon-cyan transition-colors truncate">
                                            {event.name}
                                        </h3>
                                        <div className="h-0.5 w-12 bg-neon-purple mb-4 group-hover:w-full transition-all duration-500"></div>

                                        <div className="flex justify-between items-center mb-6 text-sm text-gray-300 font-mono">
                                            <span>LOCATION</span>
                                            <a
                                                href="https://maps.app.goo.gl/YRpo99N7d8Anh75m6"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-neon-cyan font-bold text-md hover:underline decoration-neon-cyan underline-offset-4"
                                            >
                                                REC Campus
                                            </a>
                                        </div>

                                        <Link
                                            to={`/register/${event.code}`}
                                            className="block w-full py-3 bg-neon-cyan/10 border border-neon-cyan/50 hover:bg-neon-cyan text-neon-cyan hover:text-black font-bold text-center rounded-lg transition-all duration-500 uppercase tracking-widest relative overflow-hidden group/btn shadow-[0_0_15px_rgba(0,243,255,0.1)] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)]"
                                        >
                                            <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-black">INITIALIZE REGISTRATION</span>
                                            <div className="absolute inset-0 bg-neon-cyan scale-y-0 origin-bottom group-hover/btn:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></div>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Events;
