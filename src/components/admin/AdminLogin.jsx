import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { clearAdminTokens } from '../../utils/tokenUtils';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Clear any existing admin tokens before login to ensure fresh token
            clearAdminTokens();

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`, formData);

            if (response.data.success) {
                const { token, admin } = response.data;
                
                // Validate token structure and expiry
                try {
                    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
                    const expiryTime = new Date(tokenPayload.exp * 1000);
                    const currentTime = new Date();
                    
                    console.log('✅ Fresh token received');
                    console.log('Token expires:', expiryTime.toLocaleString());
                    console.log('Valid for:', Math.floor((expiryTime - currentTime) / (1000 * 60 * 60)), 'hours');
                    
                    // Ensure token is valid and not expired
                    if (expiryTime <= currentTime) {
                        throw new Error('Received expired token');
                    }
                } catch (tokenError) {
                    console.error('Token validation error:', tokenError);
                    setError('Invalid token received. Please try again.');
                    return;
                }

                // Store fresh admin data in localStorage
                localStorage.setItem('adminToken', token);
                localStorage.setItem('adminData', JSON.stringify(admin));
                localStorage.setItem('tokenTimestamp', Date.now().toString());

                console.log('✅ Admin login successful with fresh token');
                
                // Redirect to admin dashboard
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.error('Admin login error:', error);
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#4CAF50] via-[#45a049] to-[#2E7D33] flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                    >
                        <i className="ri-admin-line text-3xl text-white"></i>
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Portal</h1>
                    <p className="text-gray-600">College ERP Administration</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <i className="ri-error-warning-line"></i>
                                {error}
                            </div>
                        </motion.div>
                    )}

                    {/* Username Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="ri-user-line text-gray-400 text-lg"></i>
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Enter admin username"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="ri-lock-line text-gray-400 text-lg"></i>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Enter admin password"
                            />
                        </div>
                    </div>

                    {/* Default Credentials Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <i className="ri-information-line text-blue-500 text-lg mt-0.5"></i>
                            <div>
                                <h4 className="text-sm font-medium text-blue-800 mb-1">Default Credentials</h4>
                                <p className="text-xs text-blue-700">
                                    Username: <span className="font-mono font-semibold">admin</span><br/>
                                    Password: <span className="font-mono font-semibold">Admin@123</span>
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    Please change the password after first login.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Login Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#4CAF50] to-[#45a049] hover:from-[#45a049] hover:to-[#4CAF50] shadow-lg hover:shadow-xl'
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <i className="ri-loader-4-line animate-spin"></i>
                                Signing in...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <i className="ri-login-box-line"></i>
                                Sign In to Admin Portal
                            </div>
                        )}
                    </motion.button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Need help? Contact system administrator
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-3 text-sm text-[#4CAF50] hover:text-[#45a049] transition-colors font-medium"
                    >
                        ← Back to Main Site
                    </button>
                </div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/3 right-20 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
        </div>
    );
};

export default AdminLogin;