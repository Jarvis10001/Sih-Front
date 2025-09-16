import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import StudentVerification from './StudentVerification';

const ClerkDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [clerkData, setClerkData] = useState(null);
    const [dashboardStats, setDashboardStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if clerk is logged in
        const token = localStorage.getItem('clerkToken');
        const clerk = localStorage.getItem('clerkData');
        
        if (!token || !clerk) {
            navigate('/clerk/login');
            return;
        }

        setClerkData(JSON.parse(clerk));
        fetchDashboardStats();
    }, [navigate]);

    const fetchDashboardStats = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('clerkToken');
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clerk/dashboard-stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setDashboardStats(response.data.stats);
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setError('Failed to fetch dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('clerkToken');
        localStorage.removeItem('clerkData');
        navigate('/clerk/login');
    };

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">
                            Welcome back, {clerkData?.personalInfo?.fullName}!
                        </h2>
                        <p className="text-green-100">
                            {clerkData?.professionalInfo?.designation} - {clerkData?.professionalInfo?.department}
                        </p>
                        <p className="text-green-100 text-sm mt-1">
                            Access Level: {clerkData?.systemAccess?.accessLevel?.toUpperCase()}
                        </p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <i className="ri-user-settings-line text-3xl"></i>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Accessible Modules</p>
                            <p className="text-3xl font-bold text-gray-900">{dashboardStats.modules || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <i className="ri-apps-line text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Department</p>
                            <p className="text-lg font-bold text-gray-900">{dashboardStats.department || 'N/A'}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <i className="ri-building-line text-green-600 text-xl"></i>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Work Shift</p>
                            <p className="text-lg font-bold text-gray-900">{dashboardStats.workShift || 'N/A'}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <i className="ri-time-line text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Access Level</p>
                            <p className="text-lg font-bold text-gray-900 capitalize">
                                {dashboardStats.accessLevel || 'Read'}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <i className="ri-shield-user-line text-orange-600 text-xl"></i>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clerkData?.systemAccess?.modules?.includes('admission_processing') && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab('student-verification')}
                            className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <i className="ri-user-add-line text-white"></i>
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-900">Student Verification</p>
                                    <p className="text-sm text-gray-600">Review admission applications</p>
                                </div>
                            </div>
                        </motion.button>
                    )}

                    {clerkData?.systemAccess?.modules?.includes('document_verification') && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-300"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                    <i className="ri-file-check-line text-white"></i>
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-900">Document Verification</p>
                                    <p className="text-sm text-gray-600">Verify student documents</p>
                                </div>
                            </div>
                        </motion.button>
                    )}

                    {clerkData?.systemAccess?.modules?.includes('fee_collection') && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:from-orange-100 hover:to-orange-200 transition-all duration-300"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <i className="ri-money-dollar-circle-line text-white"></i>
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-900">Fee Collection</p>
                                    <p className="text-sm text-gray-600">Manage fee payments</p>
                                </div>
                            </div>
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-xl flex items-center justify-center">
                                <i className="ri-user-settings-line text-white text-lg"></i>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Clerk Dashboard</h1>
                                <p className="text-sm text-gray-600">College ERP - Clerk Portal</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {clerkData?.personalInfo?.fullName}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {clerkData?.employeeId}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
                            >
                                <i className="ri-logout-box-line"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
                            ...(clerkData?.systemAccess?.modules?.includes('admission_processing') ? [
                                { id: 'student-verification', label: 'Student Verification', icon: 'ri-user-add-line' }
                            ] : []),
                            { id: 'profile', label: 'Profile', icon: 'ri-user-line' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-[#4CAF50] text-[#4CAF50]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <i className={tab.icon}></i>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6"
                    >
                        <div className="flex items-center gap-2">
                            <i className="ri-error-warning-line"></i>
                            {error}
                        </div>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {renderOverview()}
                        </motion.div>
                    )}

                    {activeTab === 'student-verification' && (
                        <motion.div
                            key="student-verification"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <StudentVerification />
                        </motion.div>
                    )}

                    {activeTab === 'profile' && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                                <p className="text-gray-900">{clerkData?.personalInfo?.fullName}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Email</label>
                                                <p className="text-gray-900">{clerkData?.personalInfo?.email}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Phone</label>
                                                <p className="text-gray-900">{clerkData?.personalInfo?.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Employee ID</label>
                                                <p className="text-gray-900">{clerkData?.employeeId}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Designation</label>
                                                <p className="text-gray-900">{clerkData?.professionalInfo?.designation}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Department</label>
                                                <p className="text-gray-900">{clerkData?.professionalInfo?.department}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ClerkDashboard;