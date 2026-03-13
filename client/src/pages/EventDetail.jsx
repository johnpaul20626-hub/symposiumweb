import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserFriends, FaMoneyBillWave, FaTrophy, FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hardcoded descriptions from SRS for display enrichment
    const eventDetailsMock = {
        'T-01': { desc: 'Participants present original research papers on topics related to AI, ML, DL, etc.', prize: '₹5,000' },
        'T-02': { desc: 'HackVerse is a 12-hour intensive coding hackathon.', prize: '₹15,000' },
        'T-06': { desc: 'A fast-paced multi-round technical quiz covering AI, ML, DS.', prize: '₹4,000' },
        // ... add others as needed or generic fallback
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Fetch basic info from backend
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
                const basicInfo = res.data[id];

                if (basicInfo) {
                    setEvent({
                        ...basicInfo,
                        description: eventDetailsMock[id]?.desc || 'A competitive event designed to test your skills.',
                        prize: eventDetailsMock[id]?.prize || 'Trophy + Certificate',
                        code: id
                    });
                }
            } catch (error) {
                console.error("Error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRegister = () => {
        // Navigate to payment/registration with event data
        navigate('/payment', { state: { event } });
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-neon-green">Loading...</div>;
    if (!event) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500">Event Not Found</div>;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4">
                <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                    <FaArrowLeft /> Back to Events
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Info */}
                    <div>
                        <div className="inline-block px-4 py-1 rounded bg-neon-purple/20 text-neon-purple font-bold tracking-widest text-xs uppercase mb-4">
                            {event.type}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black font-gaming mb-6">{event.name}</h1>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            {event.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                            <div className="bg-gray-900 border border-white/10 p-4 rounded-xl group">
                                <FaMapMarkerAlt className="text-neon-cyan text-xl mb-2 group-hover:scale-110 transition-transform" />
                                <div className="text-gray-500 text-xs uppercase group-hover:text-neon-cyan transition-colors">Location</div>
                                <div className="text-sm md:text-base font-bold truncate" title={event.location || 'College Campus'}>
                                    {event.location || 'College Campus'}
                                </div>
                            </div>
                            <div className="bg-gray-900 border border-white/10 p-4 rounded-xl group">
                                <FaCalendarAlt className="text-neon-purple text-xl mb-2 group-hover:scale-110 transition-transform" />
                                <div className="text-gray-500 text-xs uppercase group-hover:text-neon-purple transition-colors">Day</div>
                                <div className="text-base font-bold truncate">
                                    {event.day || 'Day 1'}
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1 bg-gray-900 border border-white/10 p-4 rounded-xl">
                                <FaTrophy className="text-gaming-accent text-xl mb-2" />
                                <div className="text-gray-500 text-xs uppercase">First Prize</div>
                                <div className="text-2xl font-bold truncate">{event.prize}</div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/register/${event.id}`)}
                            className="w-full bg-neon-green text-black font-black py-4 px-12 rounded-none transform skew-x-[-10deg] hover:bg-white transition-colors duration-300 shadow-[0_0_20px_#39ff14]"
                        >
                            <span className="block transform skew-x-[10deg] uppercase tracking-wider text-xl">
                                Initiate Registration
                            </span>
                        </motion.button>
                    </div>

                    {/* Right Column - Visual/Rules */}
                    <div className="bg-gray-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold font-gaming mb-6 border-b border-gray-700 pb-4">Rules & Regulations</h3>
                        <ul className="space-y-4 text-gray-300 list-disc pl-5 marker:text-neon-purple">
                            <li>Valid College ID is mandatory.</li>
                            <li>Participants must report 15 mins before kick-off.</li>
                            <li>Judges' decision is final and binding.</li>
                            <li>Respect the code of conduct at all times.</li>
                            {/* Add more generic or specific rules here */}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventDetail;
