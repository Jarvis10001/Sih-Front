import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        email: formData.email,
        password: formData.password,
        name: formData.email.split('@')[0] // Use email username as name
      });

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect to login page with success message
        navigate('/login', { 
          state: { 
            message: 'Account created successfully! Please log in.',
            type: 'success'
          }
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputClasses = `
    w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg
    focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20
    text-[#333333] placeholder-[#6C757D]
    transition-all duration-300
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50]/5 via-white to-[#4CAF50]/5 relative overflow-hidden">
      {/* Add Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 text-[#4CAF50] bg-transparent hover:bg-white/90 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg border border-[#4CAF50]/20"
      >
        <i className="ri-arrow-left-s-line text-xl"></i>
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="absolute inset-0 bg-[#4CAF50]/5 backdrop-blur-3xl"></div>
      
      <div className="relative min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl"
          >
            <div className="mb-6 text-center">
              <h3 className="font-semibold text-2xl text-[#333333] mb-2">Create Account</h3>
              <p className="text-sm text-[#6C757D]">
                Join our College ERP System
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-50 text-red-500 text-sm border border-red-100"
                >
                  {error}
                </motion.div>
              )}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Email"
                required
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Password"
                required
                minLength={6}
              />

              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full py-2.5 rounded-lg font-semibold transition duration-300
                  ${loading 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-[#4CAF50] hover:bg-[#45a049] text-white shadow-md shadow-[#4CAF50]/20'
                  }
                `}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#6C757D]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#4CAF50] hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#4CAF50" fillOpacity="0.05" d="M0,224L80,197.3C160,171,320,117,480,117.3C640,117,800,171,960,197.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default SignUp;