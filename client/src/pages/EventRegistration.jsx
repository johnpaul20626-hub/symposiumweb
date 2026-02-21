import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaBuilding, FaPhone, FaEnvelope, FaIdCard, FaGraduationCap, FaUsers, FaFileUpload, FaQrcode, FaCheckCircle, FaTimes } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EventRegistration = () => {
    const { eventCode } = useParams();
    const navigate = useNavigate();
    const [eventDetails, setEventDetails] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        college: '',
        year: '',
        email: '',
        phoneNumber: '',
        teamName: '',
        teamMembers: [],
        paymentScreenshot: null // For file upload
    });

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [success, setSuccess] = useState(false);

    // Fetch Event Details
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get('/server/symposium_api/api/events');
                if (res.data[eventCode]) {
                    setEventDetails({ ...res.data[eventCode], code: eventCode });
                } else {
                    setError('Invalid Event Code');
                }
            } catch (err) {
                console.error("Failed to fetch event details", err);
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventCode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
    };

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.college || !formData.year) {
            setError("Please fill all required fields before proceeding.");
            return;
        }

        setShowPaymentModal(true);
    };

    const handleFinalSubmit = async () => {
        if (!formData.paymentScreenshot) {
            setError("Please upload the payment screenshot.");
            return;
        }

        setRegistering(true);
        setError('');

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'teamMembers') {
                    data.append(key, JSON.stringify(formData[key]));
                } else {
                    data.append(key, formData[key]);
                }
            });
            data.append('eventCode', eventCode);
            data.append('amountPaid', eventDetails.fee);

            await axios.post('/server/symposium_api/api/events/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSuccess(true);

            // Open Whatsapp Community link in a new tab
            setTimeout(() => {
                window.open("https://chat.whatsapp.com/E2ni7lOrvcPCLmWhRX18oL", "_blank");
            }, 1000);

            // Redirect back to home after 5 seconds
            setTimeout(() => {
                navigate('/');
            }, 5000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Registration Failed");
            setRegistering(false);
        }
    };

    // Input styles - Updated for Deep Blue Theme
    const inputGroupClasses = "relative group";
    const inputClasses = "w-full bg-midnight/50 border border-white/10 text-white py-4 pl-12 pr-4 rounded-none skew-x-[-10deg] focus:outline-none focus:border-neon-cyan focus:bg-midnight/80 focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all duration-300 placeholder-transparent peer font-mono tracking-wide";
    const labelClasses = "absolute left-12 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon-cyan peer-valid:-top-6 peer-valid:text-xs peer-valid:text-neon-cyan pointer-events-none font-bold skew-x-[-10deg]";
    const iconClasses = "absolute left-4 top-5 text-gray-500 transition-colors peer-focus:text-neon-cyan peer-valid:text-neon-cyan z-10 text-lg skew-x-[-10deg]";

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-deep-blue flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-cyan/10 blur-[120px] rounded-full animate-pulse-slow"></div>
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center z-10 bg-midnight/80 backdrop-blur-xl p-12 border border-neon-cyan/30 shadow-[0_0_50px_rgba(0,243,255,0.2)] relative"
                >
                    <div className="absolute inset-0 border border-neon-cyan/20 pointer-events-none"></div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2, rotate: 360 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-7xl text-neon-cyan mb-8 mx-auto w-fit drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]"
                    >
                        <FaCheckCircle />
                    </motion.div>
                    <h1 className="text-5xl font-black font-gaming mb-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        ACCESS GRANTED
                    </h1>
                    <p className="text-gray-300 mb-8 max-w-lg mx-auto text-lg font-bold">
                        Identity Confirmed: <span className="text-neon-cyan">{formData.name}</span>.
                        <br />
                        Mission Target: <span className="text-neon-purple">{eventDetails?.name}</span>.
                    </p>
                    <div className="mb-6 p-4 border border-green-500/30 bg-green-500/10 rounded-lg animate-pulse">
                        <p className="text-green-400 font-bold tracking-widest text-sm">
                            REDIRECTING TO WHATSAPP COMMUNITY...
                        </p>
                    </div>
                    <p className="text-sm text-neon-cyan/60 font-mono">&gt; Returning to command center in 5s...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-deep-blue text-white overflow-x-hidden">
            <Navbar />

            <div className="min-h-screen container mx-auto px-4 py-32 flex justify-center">
                {/* Background elements */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-neon-cyan/5 blur-[80px] rounded-full"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/5 blur-[80px] rounded-full"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-20 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Event Info Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-midnight/60 backdrop-blur-md p-8 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] h-fit sticky top-24 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan group-hover:h-full transition-all duration-500"></div>

                            {loading ? (
                                <div className="animate-pulse h-64 bg-white/5 rounded"></div>
                            ) : eventDetails ? (
                                <>
                                    <h2 className="text-4xl font-black font-gaming text-white mb-2 leading-none uppercase">{eventDetails.name}</h2>
                                    <div className="text-neon-cyan font-bold font-mono text-2xl mb-8 mt-4 border-b border-white/10 pb-4">Fee: ₹{eventDetails.fee}</div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-3">Event Commanders</h3>
                                            <div className="space-y-3">
                                                {eventDetails.coordinators?.map((c, i) => (
                                                    <div key={i} className="flex justify-between items-center text-sm">
                                                        <span className="text-white font-bold">{c.name}</span>
                                                        {c.phone && (
                                                            <a href={`tel:${c.phone} `} className="text-neon-cyan hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-3 py-1 rounded-sm text-xs font-mono">
                                                                <FaPhone /> {c.phone}
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Indicator */}
                                    <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-3">
                                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_10px_#00f3ff]"></div>
                                        <span className="text-neon-cyan text-xs font-bold uppercase tracking-widest">System Online</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-red-500">Event not found</div>
                            )}
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-black/40 backdrop-blur-xl p-8 md:p-12 border border-white/5 shadow-2xl relative">
                            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                                <FaIdCard className="text-9xl text-white" />
                            </div>

                            <div className="flex items-center justify-between mb-10 relative z-10">
                                <h2 className="text-3xl font-bold text-white flex items-center gap-4 font-gaming">
                                    <span className="text-neon-cyan">&gt;&gt;</span>
                                    INITIATE REGISTRATION
                                </h2>
                                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider border border-gray-700 px-3 py-1 rounded">Step 1 / 2</div>
                            </div>

                            {error && !showPaymentModal && (
                                <div className="mb-8 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-200 text-sm font-mono">
                                    [ERROR] {error}
                                </div>
                            )}

                            <form onSubmit={handleInitialSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                {/* Form inputs with itemVariants */}
                                <div className="md:col-span-2 relative group">
                                    <FaUser className={iconClasses} />
                                    <input type="text" id="name" name="name" placeholder="Full Name" onChange={handleChange} required className={inputClasses} />
                                    <label htmlFor="name" className={labelClasses}>Full Name</label>
                                </div>

                                <div className="relative group">
                                    <FaBuilding className={iconClasses} />
                                    <input type="text" id="dept" name="department" placeholder="Department" onChange={handleChange} required className={inputClasses} />
                                    <label htmlFor="dept" className={labelClasses}>Department</label>
                                </div>

                                <div className="relative group">
                                    <FaGraduationCap className={iconClasses} />
                                    <input type="text" id="college" name="college" placeholder="College" onChange={handleChange} required className={inputClasses} />
                                    <label htmlFor="college" className={labelClasses}>College Name</label>
                                </div>

                                <div className="relative group">
                                    <FaGraduationCap className={iconClasses} />
                                    <select name="year" onChange={handleChange} required className={`${inputClasses} appearance-none text-white cursor-pointer`}>
                                        <option value="" className="text-gray-500">Select Year</option>
                                        <option value="I" className="bg-black">I Year</option>
                                        <option value="II" className="bg-black">II Year</option>
                                        <option value="III" className="bg-black">III Year</option>
                                        <option value="IV" className="bg-black">IV Year</option>
                                    </select>
                                    <div className="absolute right-4 top-5 pointer-events-none text-neon-cyan text-xs">▼</div>
                                </div>

                                <div className="relative group">
                                    <FaPhone className={iconClasses} />
                                    <input type="tel" id="phone" name="phoneNumber" placeholder="Phone" onChange={handleChange} required className={inputClasses} />
                                    <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                                </div>

                                <div className="md:col-span-2 relative group">
                                    <FaEnvelope className={iconClasses} />
                                    <input type="email" id="email" name="email" placeholder="Email" onChange={handleChange} required className={inputClasses} />
                                    <label htmlFor="email" className={labelClasses}>Email Address</label>
                                </div>

                                {/* Optional Team Details */}
                                <div className="md:col-span-2 mt-4 border-t border-white/10 pt-8">
                                    <h3 className="text-lg font-bold text-gray-400 mb-6 flex items-center gap-2 font-gaming tracking-wider"><FaUsers /> SQUAD DETAILS (OPTIONAL)</h3>
                                </div>

                                <div className="md:col-span-2 relative group">
                                    <FaUsers className={iconClasses} />
                                    <input type="text" id="teamName" name="teamName" placeholder="Team Name" onChange={handleChange} className={inputClasses} />
                                    <label htmlFor="teamName" className={labelClasses}>Team Name (If applicable)</label>
                                </div>

                                <div className="md:col-span-2 mt-8">
                                    <motion.button
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-black py-5 px-8 shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:bg-neon-cyan hover:text-black transition-all duration-300 uppercase tracking-[0.2em] text-xl clip-path-polygon"
                                        style={{ clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
                                    >
                                        Proceed to Payment
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>

                {/* Payment Modal */}
                <AnimatePresence>
                    {showPaymentModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                                onClick={() => setShowPaymentModal(false)}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                                className="relative bg-midnight border border-neon-cyan/50 p-10 max-w-md w-full shadow-[0_0_100px_rgba(0,243,255,0.15)] z-60"
                            >
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                                >
                                    <FaTimes className="text-xl" />
                                </button>

                                <h2 className="text-3xl font-black font-gaming text-white text-center mb-2">AUTHORIZE PAYMENT</h2>
                                <p className="text-neon-cyan text-center mb-8 text-sm uppercase tracking-widest font-mono">Secure Transaction Protocol</p>

                                <div className="relative group p-[2px] rounded-3xl bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-[length:200%_auto] animate-gradient shadow-[0_0_50px_rgba(0,243,255,0.3)] mx-auto max-w-sm w-full mb-8">
                                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan opacity-40 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                                    <div className="relative bg-[#f6f8fb] p-6 rounded-3xl flex flex-col items-center overflow-hidden z-10 w-full">
                                        <div className="absolute top-[-40px] right-[-40px] w-32 h-32 bg-purple-300 opacity-40 blur-[30px] rounded-full z-0 animate-blob"></div>
                                        <div className="absolute bottom-[-40px] left-[-40px] w-32 h-32 bg-cyan-300 opacity-40 blur-[30px] rounded-full z-0 animate-blob animation-delay-2000"></div>

                                        <div className="flex items-center gap-3 mb-5 relative z-10 w-full">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300 flex-shrink-0">
                                                <img src="https://ui-avatars.com/api/?name=TREASURER&background=4CAF50&color=fff" alt="User" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-gray-700 font-sans font-medium text-lg tracking-wide shadow-sm">TREASURER</span>
                                        </div>

                                        <div className="relative z-10 w-52 h-52 bg-white rounded-2xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex items-center justify-center mb-5">
                                            <img src="/qr.jpeg" alt="Payment QR" className="w-full h-full object-cover rounded-xl" onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }} />
                                            <div className="hidden w-full h-full items-center justify-center bg-gray-50 flex-col text-gray-400 text-xs text-center border-dashed border-2 border-gray-200 rounded-xl px-2">
                                                <span className="mb-1 block">Place 'qr.jpeg' in public</span>
                                                <FaQrcode className="text-4xl text-gray-300 mt-2" />
                                            </div>
                                        </div>

                                        <div className="text-center relative z-10 w-full border-t border-gray-200 pt-3">
                                            <p className="text-gray-600 mb-1 font-sans text-sm">UPI ID: <span className="text-gray-800 font-bold">marvel80008@okhdfcbank</span></p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-center text-white font-bold text-2xl mb-8 font-mono">Amount: <span className="text-neon-cyan">₹{eventDetails?.fee}</span></p>

                                {error && (
                                    <div className="mb-4 p-2 bg-red-900/50 text-red-200 text-xs text-center border border-red-500 font-mono">
                                        [ERROR] {error}
                                    </div>
                                )}

                                <div className="space-y-6">
                                    <label className="block w-full cursor-pointer group">
                                        <div className="bg-black/50 border border-dashed border-gray-600 p-6 flex flex-col items-center justify-center group-hover:border-neon-cyan group-hover:bg-neon-cyan/5 transition-all">
                                            <FaFileUpload className="text-3xl text-gray-400 mb-2 group-hover:text-neon-cyan transition-colors" />
                                            <span className="text-gray-400 text-sm group-hover:text-white pb-1 font-mono uppercase text-xs tracking-wider">
                                                {formData.paymentScreenshot ? formData.paymentScreenshot.name : "Upload Proof of Transfer"}
                                            </span>
                                        </div>
                                        <input
                                            type="file"
                                            name="paymentScreenshot"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </label>

                                    <button
                                        onClick={handleFinalSubmit}
                                        disabled={registering}
                                        className="w-full bg-neon-cyan text-black font-black py-4 shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)] hover:scale-[1.02] transition-all uppercase tracking-widest flex items-center justify-center gap-2 text-lg"
                                    >
                                        {registering ? 'Processing...' : 'CONFIRM ACCESS'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
};

export default EventRegistration;
