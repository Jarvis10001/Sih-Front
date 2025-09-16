import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const ClerkLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/clerk/login`, formData);
            
            if (response.data.success) {
                localStorage.setItem('clerkToken', response.data.token);
                localStorage.setItem('clerkData', JSON.stringify(response.data.clerk));
                navigate('/clerk/dashboard');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F5E8] via-[#F0F8F0] to-[#E8F5E8] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    >
                        <i className="ri-user-settings-line text-white text-2xl"></i>
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Clerk Login</h2>
                    <p className="text-gray-600">Access your clerk dashboard</p>
                </div>

                {/* Error Alert */}
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

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Employee ID
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                required
                                placeholder="Enter your employee ID"
                                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10 transition-all duration-300 pl-12 text-gray-900 placeholder-gray-500"
                            />
                            <i className="ri-badge-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10 transition-all duration-300 pl-12 text-gray-900 placeholder-gray-500"
                            />
                            <i className="ri-lock-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#4CAF50] to-[#45a049] hover:from-[#45a049] hover:to-[#4CAF50] shadow-lg hover:shadow-xl'
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Signing In...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <i className="ri-login-box-line"></i>
                                Sign In
                            </div>
                        )}
                    </motion.button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Need help? Contact your system administrator
                    </p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            onClick={() => navigate('/student/login')}
                            className="text-sm text-[#4CAF50] hover:text-[#45a049] font-medium transition-colors"
                        >
                            Student Login
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => navigate('/teacher/login')}
                            className="text-sm text-[#4CAF50] hover:text-[#45a049] font-medium transition-colors"
                        >
                            Teacher Login
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => navigate('/admin/login')}
                            className="text-sm text-[#4CAF50] hover:text-[#45a049] font-medium transition-colors"
                        >
                            Admin Login
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ClerkLogin;