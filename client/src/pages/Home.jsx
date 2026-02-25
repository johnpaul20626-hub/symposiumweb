import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRocket, FaGamepad, FaCode, FaUserTie, FaPhoneAlt } from 'react-icons/fa';

const Home = () => {
    const targetRef = useRef(null);
    const [stats, setStats] = useState({ events: '10+', participants: '500+', prizePool: '₹20K+' });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch dynamic stats from backend
                const res = await fetch('http://localhost:5001/api/events/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats({
                        events: `${data.events}+`,
                        participants: `${data.participants}+`,
                        prizePool: data.prizePool
                    });
                }
            } catch (error) {
                console.error("Failed to fetch statistics:", error);
            }
        };
        fetchStats();
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

    return (
        <div className="min-h-screen bg-deep-blue text-white overflow-hidden relative">
            <Navbar />

            {/* Ultra-Smooth High-Performance Static Liquid Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05070f] w-screen h-screen">
                {/* Static Base Image Layer */}
                <img
                    src="/assets/image.png"
                    alt="Background Layer"
                    className="absolute inset-0 w-full h-full object-cover opacity-100 will-change-transform"
                />

                {/* Performance Optimized Overlay (No Backdrop Blur) */}
                <div className="absolute inset-0 bg-[#02040a]/75 z-10"></div>

                {/* EXTREMELY Optimized Static Background UI Blobs - 100% Mobile Safe (No Blur/No Animation) */}
                <div
                    className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full z-20 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(0,243,255,0.15) 0%, rgba(0,243,255,0) 70%)' }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full z-20 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(188,19,254,0.15) 0%, rgba(188,19,254,0) 70%)' }}
                />
                <div
                    className="absolute top-[20%] left-[30%] w-[50vw] h-[50vw] rounded-full z-20 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0) 70%)' }}
                />

                {/* Dark Vignette Overlay for Depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.95)] z-20 pointer-events-none"></div>
            </div>

            {/* Hero Section */}
            <header ref={targetRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    style={{ opacity, scale, y }}
                    className="relative w-full"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        className="relative z-10"
                    >
                        <h2 className="text-neon-cyan text-xs sm:text-sm md:text-lg lg:text-xl font-bold tracking-[0.1em] sm:tracking-[0.2em] mb-8 uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.8)] whitespace-nowrap">
                            Department of Artificial Intelligence and Data Science Presents
                        </h2>

                        {/* Powerful Holographic Anti-Gravity Chrome Typography */}
                        <div className="relative inline-block w-full py-12">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease: "easeOut",
                                    delay: 0.2
                                }}
                                data-text="ARTIMUS 2.0"
                                className="text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] font-audiowide liquid-chrome relative z-10 leading-none px-4"
                            >
                                ARTIMUS 2.0
                            </motion.h1>
                            {/* High-Energy Glow Behind Text */}
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[50%] bg-neon-cyan/20 blur-[60px] z-0 pointer-events-none"
                            ></motion.div>
                        </div>

                        <p className="text-xs sm:text-sm md:text-lg lg:text-2xl text-gray-300 mx-auto mb-12 font-light tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.2em] lg:tracking-[0.3em] uppercase font-gaming whitespace-nowrap w-full drop-shadow-md">
                            BUILT BY HUMANS. PERFECTED BY INTELLIGENCE.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col md:flex-row gap-6 justify-center items-center relative z-20 pointer-events-auto mt-4"
                    >
                        <Link
                            to="/events"
                            className="px-10 py-4 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-bold rounded-none uppercase tracking-widest hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)]"
                        >
                            Explore Events
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-neon-cyan/50"
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-neon-cyan to-transparent"></div>
                </motion.div>
            </header>

            {/* About / Categories Section */}
            <section className="relative z-10 py-32 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<FaCode />}
                        title="Technical"
                        desc="Debug, decode, and dominate in our high-tier coding protocols."
                        color="text-neon-cyan"
                        borderColor="border-neon-cyan/30"
                        hoverShadow="group-hover:shadow-[0_0_30px_rgba(0,243,255,0.3)]"
                    />
                    <FeatureCard
                        icon={<FaGamepad />}
                        title="Non-Technical"
                        desc="Strategy, skill, and survival. Prove your worth in the arena."
                        color="text-neon-purple"
                        borderColor="border-neon-purple/30"
                        hoverShadow="group-hover:shadow-[0_0_30px_rgba(188,19,254,0.3)]"
                    />
                    <FeatureCard
                        icon={<FaRocket />}
                        title="Innovation"
                        desc="Paper presentations that redefine the boundaries of AI & DS."
                        color="text-white"
                        borderColor="border-white/30"
                        hoverShadow="group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    />
                </div>
            </section>

            {/* Payment QR Section */}
            <section className="relative z-10 pb-20 pt-10 container mx-auto px-6 flex flex-col items-center justify-center">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black font-gaming text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        OFFICIAL <span className="text-neon-cyan">PAYMENT</span>
                    </h2>
                    <p className="text-gray-400 font-mono tracking-widest uppercase">Scan to authorize access</p>
                </div>

                <div className="relative group p-[2px] rounded-3xl bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-[length:200%_auto] animate-gradient shadow-[0_0_50px_rgba(0,243,255,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="relative bg-[#f6f8fb] p-8 rounded-3xl flex flex-col items-center overflow-hidden z-10 max-w-sm w-full">
                        {/* The liquid effect blob in background */}
                        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-purple-300 opacity-40 blur-[40px] rounded-full z-0 animate-blob"></div>
                        <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-cyan-300 opacity-40 blur-[40px] rounded-full z-0 animate-blob animation-delay-2000"></div>

                        <div className="flex items-center gap-3 mb-6 relative z-10 w-full">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300 flex-shrink-0">
                                <img src="https://ui-avatars.com/api/?name=TREASURER&background=4CAF50&color=fff" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-gray-700 font-sans font-medium text-lg">TREASURER</span>
                        </div>

                        <div className="relative z-10 w-64 h-64 bg-white rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex items-center justify-center mb-6">
                            <img src="/qr.jpeg" alt="Payment QR" className="w-full h-full object-cover rounded-xl" onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }} />
                            <div className="hidden w-full h-full items-center justify-center bg-gray-50 flex-col text-gray-400 text-xs text-center border-dashed border-2 border-gray-200 rounded-xl px-2">
                                <span className="mb-2 block">Please place QR as 'qr.jpeg' in public folder</span>
                                <span className="text-gray-300 font-mono text-[10px]">GPay / UPI supported</span>
                            </div>
                        </div>

                        <div className="text-center relative z-10 w-full border-t border-gray-200 pt-4">
                            <p className="text-gray-600 mb-2 font-sans text-sm">UPI ID: <span className="text-gray-800">marvel80008@okhdfcbank</span></p>
                            <p className="text-gray-500 text-xs font-sans">Scan to pay with any UPI app</p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Coordinators Section */}
            <section className="relative z-10 py-24 container mx-auto px-6 border-t border-white/5">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-gaming text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        SYMPOSIUM <span className="text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">COORDINATORS</span>
                    </h2>
                    <div className="w-24 h-1 bg-neon-cyan mx-auto rounded-full shadow-[0_0_10px_#00f3ff]"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-12 text-center items-center">
                    <CoordinatorCard
                        name="SEBASTIEN JEBAZ"
                        phone="+91 90872 57509"
                        theme="cyan"
                    />
                    <CoordinatorCard
                        name="NANDHA KUMAR"
                        phone="+91 96059 41893"
                        theme="purple"
                    />
                </div>
            </section>

            {/* Dynamic Stats Section - Moved to End of Page */}
            <section className="relative z-10 py-20 bg-midnight/50 backdrop-blur-sm border-y border-white/5 mt-10">
                <div className="container mx-auto px-6 flex flex-wrap justify-around text-center gap-10">
                    <StatBox number={stats.events} label="Events" />
                    <StatBox number={stats.participants} label="Participants" />
                    <StatBox number={stats.prizePool} label="Prize Pool" />
                </div>
            </section>

            <Footer />
        </div >
    );
};

// Sub-components for cleaner code
const FeatureCard = ({ icon, title, desc, color, borderColor, hoverShadow }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className={`bg-midnight/40 backdrop-blur-md border ${borderColor} p-10 rounded-xl relative group overflow-hidden transition-all duration-300 ${hoverShadow}`}
    >
        <div className={`text-5xl ${color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>{icon}</div>
        <h3 className="text-2xl font-bold font-gaming text-white mb-4 group-hover:text-neon-cyan transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">{desc}</p>
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${color.replace('text-', '')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </motion.div>
);

const StatBox = ({ number, label }) => (
    <div className="flex flex-col items-center">
        <h4 className="text-5xl md:text-7xl font-black font-gaming text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
            {number}
        </h4>
        <p className="text-neon-cyan uppercase tracking-[0.2em] font-bold text-sm">{label}</p>
    </div>
);

const CoordinatorCard = ({ name, phone, theme }) => {
    const isCyan = theme === 'cyan';
    const borderColor = isCyan ? 'hover:border-neon-cyan/50 hover:shadow-[0_0_40px_rgba(0,243,255,0.2)]' : 'hover:border-neon-purple/50 hover:shadow-[0_0_40px_rgba(188,19,254,0.2)]';
    const bgGradient = isCyan ? 'from-neon-cyan/20' : 'from-neon-purple/20';
    const iconBorder = isCyan ? 'border-neon-cyan/30 group-hover:border-neon-cyan group-hover:text-neon-cyan' : 'border-neon-purple/30 group-hover:border-neon-purple group-hover:text-neon-purple';
    const iconColor = isCyan ? 'text-neon-cyan' : 'text-neon-purple';

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            className={`bg-midnight/60 backdrop-blur-xl border border-white/5 p-8 rounded-2xl relative group overflow-hidden transition-all duration-500 w-full md:w-80 shadow-lg flex flex-col items-center text-center ${borderColor}`}
        >
            {/* Liquid Glowing Background on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0 pointer-events-none`}></div>

            <div className={`w-20 h-20 rounded-full bg-gray-800 border-2 flex items-center justify-center text-3xl text-white mb-6 transition-colors duration-300 relative z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${iconBorder}`}>
                <FaUserTie />
            </div>

            <h3 className="text-2xl font-black font-gaming text-white mb-2 relative z-10 tracking-wider">
                {name}
            </h3>

            <div className="w-12 h-0.5 bg-gray-600 mb-6 group-hover:bg-white transition-colors duration-300 relative z-10"></div>

            <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors bg-black/40 px-6 py-3 rounded-full border border-white/10 group-hover:border-white/30 relative z-10"
            >
                <FaPhoneAlt className={iconColor} />
                <span className="font-mono text-lg font-bold tracking-widest">{phone}</span>
            </a>
        </motion.div>
    );
};

export default Home;
