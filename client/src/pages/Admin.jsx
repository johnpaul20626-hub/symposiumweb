import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { FaDownload, FaChartPie, FaUserFriends, FaMoneyBillWave } from 'react-icons/fa';

const Admin = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterEvent, setFilterEvent] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // In a real app, this would be protected by admin middleware
                const res = await axios.get('/server/symposium_api/api/events/admin/all-registrations');
                setRegistrations(res.data);
            } catch (error) {
                console.error("Error fetching admin data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Stats Calculation
    const totalRegistrations = registrations.length;
    const totalRevenue = registrations.reduce((acc, curr) => acc + (curr.amountPaid || 0), 0);

    // Group by Event
    const eventCounts = registrations.reduce((acc, curr) => {
        const code = curr.eventCode;
        acc[code] = (acc[code] || 0) + 1;
        return acc;
    }, {});

    const filteredData = filterEvent === 'All'
        ? registrations
        : registrations.filter(r => r.eventCode === filterEvent);

    const uniqueEvents = [...new Set(registrations.map(r => r.eventCode))];

    const exportToCSV = () => {
        const headers = ["Registration ID", "Event Code", "Event Name", "User Name", "College", "Email", "Phone", "Team Name", "Amount Paid", "Txn ID"];
        const rows = filteredData.map(r => [
            r._id,
            r.eventCode,
            r.eventDetails?.name || 'Unknown',
            r.userId?.name || 'N/A',
            r.userId?.college || 'N/A',
            r.userId?.email || 'N/A',
            r.userId?.phoneNumber || 'N/A',
            r.teamName || '-',
            r.amountPaid,
            r.transactionId
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `artimus_registrations_${filterEvent}.csv`);
        document.body.appendChild(link);
        link.click();
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-neon-green">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-black font-gaming text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                        ADMIN DASHBOARD
                    </h1>
                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                    >
                        <FaDownload /> Export CSV
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gray-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
                        <div className="p-4 bg-neon-blue/20 rounded-full text-neon-blue">
                            <FaUserFriends size={24} />
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm uppercase font-bold">Total Registrations</div>
                            <div className="text-3xl font-black text-white">{totalRegistrations}</div>
                        </div>
                    </div>
                    <div className="bg-gray-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
                        <div className="p-4 bg-neon-green/20 rounded-full text-neon-green">
                            <FaMoneyBillWave size={24} />
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm uppercase font-bold">Total Revenue</div>
                            <div className="text-3xl font-black text-white">₹{totalRevenue}</div>
                        </div>
                    </div>
                    <div className="bg-gray-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
                        <div className="p-4 bg-neon-purple/20 rounded-full text-neon-purple">
                            <FaChartPie size={24} />
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm uppercase font-bold">Active Events</div>
                            <div className="text-3xl font-black text-white">{uniqueEvents.length}</div>
                        </div>
                    </div>
                </div>

                {/* Filter */}
                <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
                    <button
                        onClick={() => setFilterEvent('All')}
                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${filterEvent === 'All' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    >
                        All Events
                    </button>
                    {uniqueEvents.map(code => (
                        <button
                            key={code}
                            onClick={() => setFilterEvent(code)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${filterEvent === code ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                        >
                            {code} ({eventCounts[code]})
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="p-4 font-bold border-b border-gray-700">Reg ID</th>
                                <th className="p-4 font-bold border-b border-gray-700">Event</th>
                                <th className="p-4 font-bold border-b border-gray-700">User</th>
                                <th className="p-4 font-bold border-b border-gray-700">College</th>
                                <th className="p-4 font-bold border-b border-gray-700">Team</th>
                                <th className="p-4 font-bold border-b border-gray-700">Amount</th>
                                <th className="p-4 font-bold border-b border-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium text-gray-300 divide-y divide-gray-800">
                            {filteredData.length > 0 ? (
                                filteredData.map((reg) => (
                                    <tr key={reg._id} className="hover:bg-gray-800/50 transition-colors">
                                        <td className="p-4 font-mono text-xs text-gray-500">{reg._id.substring(0, 8)}...</td>
                                        <td className="p-4">
                                            <div className="font-bold text-white">{reg.eventDetails?.name}</div>
                                            <div className="text-xs text-gray-500">{reg.eventCode}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-white">{reg.userId?.name}</div>
                                            <div className="text-xs text-gray-500">{reg.userId?.email}</div>
                                        </td>
                                        <td className="p-4">{reg.userId?.college}</td>
                                        <td className="p-4 text-xs">{reg.teamName || '-'}</td>
                                        <td className="p-4 text-neon-green">₹{reg.amountPaid}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${reg.paymentStatus === 'paid' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                                                {reg.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-gray-500">No registrations found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Admin;
