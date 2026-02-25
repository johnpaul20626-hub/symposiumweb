import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { registrationData } = location.state || {}; // Expecting full registration data now

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!registrationData) {
            navigate('/events');
        }
    }, [registrationData, navigate]);

    const processRegistration = async (paymentId) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/events/register`, {
                ...registrationData,
                transactionId: paymentId,
                amountPaid: 500 // Hardcoded for now
            });
            setSuccess(true);
        } catch (err) {
            console.error("Registration Failed", err);
            setError(err.response?.data?.message || 'Registration failed after payment');
        } finally {
            setLoading(false);
        }
    }

    const handlePayment = async () => {
        setLoading(true);
        setError('');
        try {
            // 1. Create Order (Mock)
            await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, { amount: 500 }); // Fixed fee for now

            // 2. Simulate Payment Success
            setTimeout(() => {
                const mockPaymentId = `PAY_${Date.now()}`;
                processRegistration(mockPaymentId);
            }, 2000);

        } catch (error) {
            console.error("Payment Process Failed", error);
            setError("Payment failed. Please try again.");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
                <FaCheckCircle className="text-6xl text-neon-green mb-6 animate-bounce" />
                <h1 className="text-4xl font-black font-gaming mb-4 text-center">Registration Confirmed!</h1>
                <p className="text-gray-400 mb-8 text-center max-w-md">
                    You have successfully registered for the event.
                    Check your email for the entry pass.
                </p>
                <button
                    onClick={() => navigate('/events')}
                    className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-lg hover:bg-neon-green transition-colors"
                >
                    Register for Another Event
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4 max-w-2xl">
                <h1 className="text-3xl font-black font-gaming mb-8">Confirm & Pay</h1>

                {error && (
                    <div className="mb-6 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-center">
                        {error}
                    </div>
                )}

                <div className="bg-gray-900 border border-white/10 p-8 rounded-2xl mb-8">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Event Registration</h2>
                            <p className="text-gray-400 text-sm">ARTIMUS 2.0</p>
                        </div>
                        <div className="text-3xl font-black text-neon-green">₹500</div>
                    </div>

                    <div className="space-y-2 mb-8 text-gray-300">
                        <p><strong className="text-white">Name:</strong> {registrationData?.name}</p>
                        <p><strong className="text-white">Email:</strong> {registrationData?.email}</p>
                        <p><strong className="text-white">Event Code:</strong> {registrationData?.eventCode}</p>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-neon-purple text-white font-black py-4 rounded-xl shadow-[0_0_20px_#bc13fe] hover:shadow-[0_0_40px_#bc13fe] hover:scale-[1.02] transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-3"
                    >
                        {loading ? <><FaSpinner className="animate-spin" /> Processing...</> : 'Pay ₹500 & Register'}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Payment;
