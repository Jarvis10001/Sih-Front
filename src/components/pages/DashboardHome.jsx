import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Chatbot from "../Chatbot";

const DashboardHome = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const [chatOpen, setChatOpen] = useState(false); // toggle chat window

  const stats = [
    { title: 'Total Students', value: '1,234', icon: 'ri-user-3-line', color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Courses', value: '56', icon: 'ri-book-line', color: 'bg-teal-100 text-teal-600' },
    { title: 'Faculty Members', value: '89', icon: 'ri-group-line', color: 'bg-purple-100 text-purple-600' },
    { title: 'Pending Assignments', value: '23', icon: 'ri-file-list-3-line', color: 'bg-orange-100 text-orange-600' }
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
  };

  return (
    <div className="space-y-10 p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {userData?.name || 'User'}!
        </h1>
        <p className="text-blue-100">
          Here's what's happening at the college today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
            className={`bg-white rounded-2xl p-4 shadow-lg border border-gray-200 flex flex-col items-center justify-center transition-transform duration-300 w-full h-36 sm:h-40`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              <i className={`${stat.icon} text-xl`} />
            </div>
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Chatbot Bubble & Window */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {/* Minimized Bubble with Text */}
        {!chatOpen && (
          <div 
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
            onClick={() => setChatOpen(true)}
          >
            <i className="ri-chat-smile-2-fill text-xl"></i>
            <span className="text-sm font-medium">Hey! I’m your chatbot 🤖</span>
          </div>
        )}

        {/* Chat Window */}
        {chatOpen && (
          <div className="w-80 h-[500px] shadow-xl rounded-xl overflow-hidden bg-white flex flex-col">
            {/* Header */}
            <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
              <span>Hey! I’m your chatbot 🤖</span>
              <button onClick={() => setChatOpen(false)} className="font-bold">✕</button>
            </div>

            {/* Chatbot Component */}
            <div className="flex-1 overflow-auto">
              <Chatbot />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
