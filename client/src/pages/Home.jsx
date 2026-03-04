import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRocket, FaGamepad, FaCode, FaUserTie, FaPhoneAlt, FaRobot } from 'react-icons/fa';

const Home = () => {
    const targetRef = useRef(null);
    const [stats, setStats] = useState({ events: '10+', participants: '500+', prizePool: '₹5K+' });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch dynamic stats from backend
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events/stats`);
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
        <div className="min-h-screen bg-deep-blue text-white overflow-x-hidden relative">
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
                        className="relative z-10 w-full"
                    >
                        <h2 className="text-neon-cyan text-[9px] sm:text-sm md:text-lg lg:text-xl font-bold tracking-[0.05em] sm:tracking-[0.2em] mb-4 sm:mb-8 uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.8)] leading-relaxed mx-auto text-center px-1">
                            Department of Artificial Intelligence and Data Science <br />
                            <span className="inline-block mt-2">Presents</span> <br />
                            <span className="inline-block mt-3 text-white text-[11px] sm:text-lg md:text-2xl font-gaming tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">NATIONAL LEVEL SYMPOSIUM</span>
                        </h2>

                        {/* Bold Thick Animated Liquid Title */}
                        <div className="relative inline-block w-full py-6 sm:py-12 group">
                            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] font-audiowide font-extrabold relative z-10 leading-tight px-2 drop-shadow-[0_0_20px_rgba(150,150,150,0.5)] sm:drop-shadow-[0_0_40px_rgba(200,200,200,0.8)] tracking-normal sm:tracking-widest whitespace-nowrap hover:drop-shadow-[0_0_60px_rgba(255,255,255,1)] transition-all duration-700">
                                <motion.span
                                    className="inline-block relative text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: "linear-gradient(90deg, #333333 0%, #a0a0a0 15%, #ffffff 30%, #555555 45%, #e6e6e6 60%, #888888 75%, #ffffff 90%, #333333 100%)",
                                        backgroundSize: "200% auto"
                                    }}
                                    animate={{ backgroundPosition: ["0% center", "200% center"] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                >
                                    ARTIMUS 2.0
                                </motion.span>
                            </h1>
                            {/* High-Energy Liquid Glow Behind Text */}
                            <motion.div
                                animate={{
                                    opacity: [0.4, 0.8, 0.4],
                                    scale: [0.95, 1.05, 0.95],
                                    rotate: [0, 1, -1, 0]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[150%] bg-zinc-400/30 blur-[50px] z-0 pointer-events-none rounded-[100%]"
                            ></motion.div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="text-[9px] sm:text-sm md:text-lg lg:text-2xl text-gray-300 mx-auto mb-10 sm:mb-16 font-light tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.2em] lg:tracking-[0.3em] uppercase font-gaming break-words w-full text-center drop-shadow-md px-1"
                        >
                            BUILT BY HUMANS. PERFECTED BY INTELLIGENCE.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.8, ease: "backOut" }}
                        className="flex flex-col md:flex-row gap-6 justify-center items-center relative z-20 pointer-events-auto mt-8"
                    >
                        <Link
                            to="/events"
                            className="px-12 py-5 sm:px-16 sm:py-6 text-lg sm:text-2xl font-black bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border-2 border-neon-cyan/80 text-neon-cyan rounded-2xl uppercase tracking-[0.2em] hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all duration-500 shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:shadow-[0_0_60px_rgba(0,243,255,0.8)] transform hover:-translate-y-2 hover:scale-105 backdrop-blur-md group relative overflow-hidden"
                        >
                            <span className="relative z-10">Register Events</span>
                            <span className="absolute inset-0 w-full h-full bg-neon-cyan/20 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center pointer-events-none rounded-2xl"></span>
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

            {/* AI Robot Welcome Message Section */}
            <section className="relative z-20 pt-10 pb-20 container mx-auto px-4 sm:px-6 min-h-[500px] flex items-center">
                {/* Robot Walking From Right to Left */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 1.2, type: "spring", bounce: 0.1 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full"
                >
                    {/* The 3D Robot (True Transparent PNG, Giant Sized, Waving) */}
                    <div className="relative w-64 h-[400px] sm:w-[350px] sm:h-[500px] md:w-[500px] md:h-[700px] lg:w-[600px] lg:h-[800px] flex-shrink-0 z-20">
                        {/* Waving + Hovering Animation */}
                        <motion.img
                            src="/assets/cyberpunk_ai_robot_transparent.png"
                            alt="3D Cyberpunk AI Robot"
                            animate={{
                                y: [0, -20, 0], // Floating
                                rotate: [0, 15, -5, 12, 0] // Waving its hand
                            }}
                            transition={{
                                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }
                            }}
                            className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,243,255,0.7)]"
                            style={{
                                filter: 'contrast(1.1) brightness(1.1)'
                            }}
                        />
                        {/* Floor glow under robot */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-neon-cyan/30 blur-[20px] rounded-full z-[-1]"
                        ></motion.div>
                    </div>

                    {/* Staggered Rolling Text Message */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.8, delayChildren: 1.5 } // Wait for robot to walk in before speaking
                            }
                        }}
                        className="flex-1 text-center md:text-left z-10 w-full max-w-2xl bg-deep-blue/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-neon-cyan/20 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                    >
                        <motion.h3
                            variants={{
                                hidden: { opacity: 0, x: 50 },
                                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                            }}
                            className="text-xl sm:text-3xl font-audiowide text-white mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]"
                        >
                            <span className="text-neon-cyan typing-cursor">Hi Player!</span>
                            <br className="hidden sm:block mt-2" /> Welcome to ARTIMUS 2.0
                        </motion.h3>

                        <div className="space-y-4 text-sm sm:text-base lg:text-lg text-gray-200 font-mono tracking-wide">
                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, x: 50 },
                                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                                }}
                                className="leading-relaxed relative sm:pl-6"
                            >
                                <span className="hidden sm:inline-block absolute left-0 text-neon-purple font-bold">»</span>
                                The ultimate tech arena awaits you.
                            </motion.p>

                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, x: 50 },
                                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                                }}
                                className="leading-relaxed relative sm:pl-6"
                            >
                                <span className="hidden sm:inline-block absolute left-0 text-neon-purple font-bold">»</span>
                                Choose your events, prove your skills, and climb the leaderboard.
                            </motion.p>

                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
                                }}
                                className="leading-relaxed font-bold text-white mt-8 inline-block border-2 border-neon-cyan bg-neon-cyan/10 px-6 py-3 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                            >
                                Ready to start your mission? <span className="animate-pulse inline-block w-2 h-4 sm:w-3 sm:h-5 bg-current ml-2 align-middle"></span>
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* About / Categories Section */}
            <section className="relative z-10 py-16 sm:py-20 container mx-auto px-6">
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

            {/* Coordinators Section */}
            <section className="relative z-10 py-16 sm:py-24 container mx-auto px-6">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-gaming text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        SYMPOSIUM <span className="text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">COORDINATORS</span>
                    </h2>
                    <div className="w-24 h-1 bg-neon-cyan mx-auto rounded-full shadow-[0_0_10px_#00f3ff]"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-12 text-center items-center mb-12">
                    <CoordinatorCard
                        name="SEBASTIEN JEBAZ"
                        phone="+91 90872 57509"
                        theme="cyan"
                    />
                    <CoordinatorCard
                        name="NANDHA KUMAR"
                        phone="+91 63795 39838"
                        theme="purple"
                    />
                </div>
            </section>

            {/* Payment QR Section */}
            <section className="relative z-10 pb-20 pt-10 container mx-auto px-6 flex flex-col items-center justify-center border-t border-white/5">
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
