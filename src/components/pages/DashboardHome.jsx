import React from 'react';
import { motion } from 'framer-motion';

const DashboardHome = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const stats = [
    { title: 'Total Students', value: '1,234', icon: 'ri-user-3-line', color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Courses', value: '56', icon: 'ri-book-line', color: 'bg-teal-100 text-teal-600' },
    { title: 'Faculty Members', value: '89', icon: 'ri-group-line', color: 'bg-purple-100 text-purple-600' },
    { title: 'Pending Assignments', value: '23', icon: 'ri-file-list-3-line', color: 'bg-orange-100 text-orange-600' }
  ];

  // Framer Motion variants for staggered animation
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
    </div>
  );
};

export default DashboardHome;

