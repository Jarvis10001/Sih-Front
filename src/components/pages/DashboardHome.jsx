// import React from 'react';
// import { motion } from 'framer-motion';

// const DashboardHome = () => {
//   const userData = JSON.parse(localStorage.getItem('user') || '{}');

//   const stats = [
//     { title: 'Total Students', value: '1,234', icon: 'ri-user-3-line', color: 'bg-blue-100 text-blue-600' },
//     { title: 'Active Courses', value: '56', icon: 'ri-book-line', color: 'bg-teal-100 text-teal-600' },
//     { title: 'Faculty Members', value: '89', icon: 'ri-group-line', color: 'bg-purple-100 text-purple-600' },
//     { title: 'Pending Assignments', value: '23', icon: 'ri-file-list-3-line', color: 'bg-orange-100 text-orange-600' }
//   ];

//   const recentActivities = [
//     { action: 'New student enrolled', user: 'John Doe', time: '2 hours ago', icon: 'ri-user-add-line', color: 'text-blue-500' },
//     { action: 'Assignment submitted', user: 'Jane Smith', time: '4 hours ago', icon: 'ri-file-upload-line', color: 'text-teal-500' },
//     { action: 'Grade published', user: 'Prof. Johnson', time: '6 hours ago', icon: 'ri-award-line', color: 'text-purple-500' },
//     { action: 'Course updated', user: 'Dr. Wilson', time: '1 day ago', icon: 'ri-book-mark-line', color: 'text-orange-500' }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-2xl p-6 text-white"
//       >
//         <h1 className="text-2xl font-bold mb-2">
//           Welcome back, {userData?.name || 'User'}!
//         </h1>
//         <p className="text-blue-100">
//           Here's what's happening at the college today.
//         </p>
//       </motion.div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <motion.div
//             key={stat.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">{stat.title}</p>
//                 <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
//               </div>
//               <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
//                 <i className={`${stat.icon} text-xl`} />
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Recent Activities */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
//       >
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
//         <div className="space-y-4">
//           {recentActivities.map((activity, index) => (
//             <div key={index} className="flex items-center gap-4">
//               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//                 <i className={`${activity.icon} ${activity.color}`} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-800">{activity.action}</p>
//                 <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default DashboardHome;




// import React from 'react';
// import { motion } from 'framer-motion';

// const DashboardHome = () => {
//   const userData = JSON.parse(localStorage.getItem('user') || '{}');

//   const stats = [
//     { title: 'Total Students', value: '1,234', icon: 'ri-user-3-line', color: 'bg-blue-100 text-blue-600' },
//     { title: 'Active Courses', value: '56', icon: 'ri-book-line', color: 'bg-teal-100 text-teal-600' },
//     { title: 'Faculty Members', value: '89', icon: 'ri-group-line', color: 'bg-purple-100 text-purple-600' },
//     { title: 'Pending Assignments', value: '23', icon: 'ri-file-list-3-line', color: 'bg-orange-100 text-orange-600' }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-2xl p-6 text-white"
//       >
//         <h1 className="text-2xl font-bold mb-2">
//           Welcome back, {userData?.name || 'User'}!
//         </h1>
//         <p className="text-blue-100">
//           Here's what's happening at the college today.
//         </p>
//       </motion.div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <motion.div
//             key={stat.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">{stat.title}</p>
//                 <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
//               </div>
//               <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
//                 <i className={`${stat.icon} text-xl`} />
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;



// import React from 'react';
// import { motion } from 'framer-motion';

// const DashboardHome = () => {
//   const userData = JSON.parse(localStorage.getItem('user') || '{}');

//   const stats = [
//     { title: 'Total Students', value: '1,234', icon: 'ri-user-3-line', color: 'bg-blue-100 text-blue-600' },
//     { title: 'Active Courses', value: '56', icon: 'ri-book-line', color: 'bg-teal-100 text-teal-600' },
//     { title: 'Faculty Members', value: '89', icon: 'ri-group-line', color: 'bg-purple-100 text-purple-600' },
//     { title: 'Pending Assignments', value: '23', icon: 'ri-file-list-3-line', color: 'bg-orange-100 text-orange-600' }
//   ];

//   return (
//     <div className="space-y-10 p-6">
//       {/* Welcome Section (unchanged) */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-2xl p-6 text-white"
//       >
//         <h1 className="text-2xl font-bold mb-2">
//           Welcome back, {userData?.name || 'User'}!
//         </h1>
//         <p className="text-blue-100">
//           Here's what's happening at the college today.
//         </p>
//       </motion.div>

//       {/* Stats Grid - 2 by 2 */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {stats.map((stat, index) => (
//           <motion.div
//             key={stat.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-between`}
//           >
//             <div>
//               <p className="text-gray-500 text-sm">{stat.title}</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
//             </div>
//             <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
//               <i className={`${stat.icon} text-xl`} />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;


// import React from 'react';
// import { motion } from 'framer-motion';

// const DashboardHome = () => {
//   const userData = JSON.parse(localStorage.getItem('user') || '{}');

//   const stats = [
//     { title: 'Total Students', value: '1,234', icon: 'ri-user-3-line', color: 'bg-blue-100 text-blue-600' },
//     { title: 'Active Courses', value: '56', icon: 'ri-book-line', color: 'bg-teal-100 text-teal-600' },
//     { title: 'Faculty Members', value: '89', icon: 'ri-group-line', color: 'bg-purple-100 text-purple-600' },
//     { title: 'Pending Assignments', value: '23', icon: 'ri-file-list-3-line', color: 'bg-orange-100 text-orange-600' }
//   ];

//   // Framer Motion variants for staggered animation
//   const containerVariants = {
//     hidden: {},
//     show: {
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.95 },
//     show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
//   };

//   return (
//     <div className="space-y-10 p-6">
//       {/* Welcome Section (unchanged) */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-2xl p-6 text-white"
//       >
//         <h1 className="text-2xl font-bold mb-2">
//           Welcome back, {userData?.name || 'User'}!
//         </h1>
//         <p className="text-blue-100">
//           Here's what's happening at the college today.
//         </p>
//       </motion.div>

//       {/* Stats Grid - 2 by 2 with animations */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 gap-6"
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//       >
//         {stats.map((stat) => (
//           <motion.div
//             key={stat.title}
//             variants={cardVariants}
//             whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
//             className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-200 flex items-center justify-between transition-transform duration-300`}
//           >
//             <div>
//               <p className="text-gray-500 text-sm">{stat.title}</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
//             </div>
//             <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
//               <i className={`${stat.icon} text-xl`} />
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default DashboardHome;


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

