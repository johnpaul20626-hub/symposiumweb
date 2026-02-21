import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-deep-blue border-t border-white/5 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl font-black font-gaming tracking-widest text-white mb-6">
                    <span className="text-neon-cyan drop-shadow-[0_0_10px_#00f3ff]">ARTIMUS</span> 2.0
                </h2>
                <div className="flex justify-center gap-8 mb-8">
                    <a href="#" className="text-gray-400 hover:text-neon-cyan hover:scale-110 transition-all duration-300 text-2xl"><FaInstagram /></a>
                    <a href="#" className="text-gray-400 hover:text-neon-cyan hover:scale-110 transition-all duration-300 text-2xl"><FaLinkedin /></a>
                    <a href="#" className="text-gray-400 hover:text-neon-cyan hover:scale-110 transition-all duration-300 text-2xl"><FaGithub /></a>
                </div>
                <p className="text-gray-500 text-sm tracking-wide">
                    &copy; 2026 ARTIMUS Symposium. Styled for the Future.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
