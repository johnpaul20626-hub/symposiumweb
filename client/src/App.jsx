import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import EventRegistration from './pages/EventRegistration';
import Payment from './pages/Payment';
import Admin from './pages/Admin';

function App() {
    return (
        <div className="min-h-screen bg-dark-bg text-white selection:bg-neon-green selection:text-black font-sans">

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/register/:eventCode" element={<EventRegistration />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
