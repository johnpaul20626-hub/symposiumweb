import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'HOME', path: '/' },
        { name: 'EVENTS', path: '/events' },
        { name: 'LOCATION', path: 'https://maps.app.goo.gl/YRpo99N7d8Anh75m6', external: true },
        // { name: 'ADMIN', path: '/admin' }, // Hidden for user view
    ];

    return (
        <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/10 bg-deep-blue/80 backdrop-blur-xl shadow-[0_0_20px_rgba(0,243,255,0.1)]">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-black font-gaming tracking-widest text-white flex items-center gap-2">
                    <span className="text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">ARTIMUS</span> 2.0
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-8">
                    {links.map((link) => (
                        <li key={link.name}>
                            {link.external ? (
                                <a
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-sm font-bold tracking-widest transition-all duration-300 relative group text-gray-400 hover:text-white`}
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ) : (
                                <Link
                                    to={link.path}
                                    className={`text-sm font-bold tracking-widest transition-all duration-300 relative group ${location.pathname === link.path ? 'text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full shadow-[0_0_10px_#00f3ff]' : ''}`}></span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Icon */}
                <div className="md:hidden text-white text-2xl cursor-pointer hover:text-neon-cyan transition-colors" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 border-b border-gray-800"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {links.map((link) => (
                                link.external ? (
                                    <a
                                        key={link.name}
                                        href={link.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-4 rounded-md text-base font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:bg-gray-800"
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-3 py-4 rounded-md text-base font-bold uppercase tracking-wider ${location.pathname === link.path ? 'text-neon-green bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
