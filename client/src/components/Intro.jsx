import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mainLogo from '../assets/main_logo.mp4'; // Ensure this file exists

const Intro = ({ onComplete }) => {
    const videoRef = useRef(null);

    const handleVideoEnd = () => {
        onComplete();
    };

    // Make the video play 4x faster right when it mounts
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 4.0;
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        >
            {/* Cinematic Overlay Effects */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/20 mix-blend-overlay"></div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150"></div>

            {/* Glowing Vignette for Depth */}
            <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>

            <video
                ref={videoRef}
                src={mainLogo}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="w-full h-full object-cover shadow-[0_0_30px_rgba(0,0,0,0.9)] will-change-opacity"
                onError={(e) => console.error("Video Error:", e)}
            />
        </motion.div>
    );
};

export default Intro;
