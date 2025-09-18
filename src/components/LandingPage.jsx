// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// // Note: You must have 'remixicon' or a similar icon library linked in your index.html or project's main CSS file for the 'ri-' classes to work.

// const LandingPage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // isMenuOpen state remains unused but is kept for future mobile nav integration

//   const features = [
//     {
//       icon: '📚',
//       title: 'Streamlined Admissions',
//       description: 'Automated admission intake with digital forms, document verification, and instant confirmation. No more queues or paperwork.'
//     },
//     {
//       icon: '💰',
//       title: 'Automated Fee Collection',
//       description: 'Digital receipts, payment tracking, and automated notifications. Real-time financial overview for administrators.'
//     },
//     {
//       icon: '🏠',
//       title: 'Smart Hostel Management',
//       description: 'Live occupancy tracking, room allocation, and maintenance requests. Complete hostel ecosystem management.'
//     },
//     {
//       icon: '📊',
//       title: 'Real-time Dashboards',
//       description: 'Comprehensive analytics and reporting for administrators. Key metrics and institutional overview at a glance.'
//     },
//     {
//       icon: '🔒',
//       title: 'Secure & Role-based',
//       description: 'Built-in security with role-based access control. Data protection and regular backups ensure safety.'
//     },
//     {
//       icon: '☁️',
//       title: 'Cloud-based Solution',
//       description: 'Leverages familiar cloud office suites. Low-cost, scalable solution that any college can implement.'
//     }
//   ];

//   const benefits = [
//     { stat: '80%', label: 'Reduction in Administrative Time' },
//     { stat: '95%', label: 'Data Accuracy Improvement' },
//     { stat: '70%', label: 'Cost Savings vs Traditional ERP' },
//     { stat: '24/7', label: 'System Availability' }
//   ];

//   const workflow = [
//     {
//       step: '1',
//       title: 'Admission Intake',
//       description: 'Students apply through digital forms'
//     },
//     {
//       step: '2',
//       title: 'Data Integration',
//       description: 'Information flows to central database'
//     },
//     {
//       step: '3',
//       title: 'Automated Processing',
//       description: 'Fees, hostel, library records update automatically'
//     },
//     {
//       step: '4',
//       title: 'Real-time Insights',
//       description: 'Administrators access live dashboards'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 antialiased">
//       {/* Navbar Placeholder */}
//       <nav className="fixed w-full z-30 bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <span className="text-xl font-extrabold text-gray-900 flex items-center">
//                   <span className="text-3xl text-blue-600 mr-2">◭</span>Smart College <span className="text-blue-600 ml-1">ERP</span>
//                 </span>
//               </div>
//             </div>
//             <div className="hidden md:flex space-x-8 text-lg font-medium">
//               <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Features</a>
//               <a href="#solutions" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Workflow</a>
//               <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Pricing</a>
//               <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Contact</a>
//             </div>
//             <div className="hidden md:block">
//               <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
//                 Sign In
//               </Link>
//             </div>
//             <button
//               className="md:hidden text-gray-600"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               <i className={`ri-menu-${isMenuOpen ? 'open' : 'line'} text-2xl`}></i>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu - kept for completeness */}
//       {/* {isMenuOpen && (
//         <div className="md:hidden fixed top-20 left-0 right-0 z-40 bg-white shadow-xl">
//           <a href="#features" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Features</a>
//           <a href="#solutions" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Workflow</a>
//           <a href="#pricing" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Pricing</a>
//           <a href="#contact" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Contact</a>
//           <Link to="/login" className="block text-center bg-blue-600 text-white px-4 py-3 m-4 rounded-xl font-semibold">Sign In</Link>
//         </div>
//       )} */}
//       
//       {/* Hero Section - Elevated and Vibrant */}
//       <section id="home" className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white pt-20 overflow-hidden">
//         {/* Abstract Background Shapes for extra visual flair */}
//         <div className="absolute top-0 right-0 h-96 w-96 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
//         <div className="absolute bottom-0 left-0 h-64 w-64 bg-yellow-300 opacity-5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//             <div className="text-center lg:text-left">
//               <h1 className="text-5xl lg:text-7xl font- leading-tight mb-6 tracking-tight">
//                 Smart College ERP
//                 <span className="text-yellow-300 block lg:inline"> Simplified.</span>
//               </h1>
//               <p className="text-xl lg:text-2xl mb-10 text-blue-100 leading-relaxed max-w-xl lg:max-w-full mx-auto">
//                 Transform your institution with an integrated, cloud-based ERP system. 
//                 Streamline admissions, fee collection, hostel management, and more—
//                 all without breaking the budget.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
//                 <button className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ring-4 ring-red-300 ring-opacity-50">
//                   Get Started Today
//                 </button>
//                 <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
//                   Watch Demo
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section - Clean and Bold */}
//       <section className="bg-gray-50 py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//             {benefits.map((benefit, index) => (
//               <div 
//                 key={index} 
//                 className="text-center p-4 border-r border-gray-200 last:border-r-0"
//               >
//                 <h3 className="text-5xl lg:text-6xl font-extrabold text-blue-600 mb-2 leading-none">
//                   {benefit.stat}
//                 </h3>
//                 <p className="text-lg text-gray-600 font-medium">{benefit.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Portal Access Section - Visually Engaging with Hover Effects */}
//       <section className="py-20 bg-gradient-to-r from-white via-blue-50 to-purple-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Access Your Portal</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Secure, role-based access for your entire academic community.
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {/* Student Portal */}
//             <Link 
//               to="/login" 
//               className="group bg-white p-10 rounded-3xl border-2 border-transparent shadow-lg hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
//             >
//               <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg">
//                 <i className="ri-graduation-cap-line text-3xl"></i>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">Student Portal</h3>
//               <p className="text-gray-600 mb-4">Access forms, pay fees, view records, and manage your academic life.</p>
//               <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700">
//                 Sign In <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
//               </div>
//             </Link>

//             {/* Teacher Portal */}
//             <Link 
//               to="/teacher/login" 
//               className="group bg-white p-10 rounded-3xl border-2 border-transparent shadow-lg hover:border-green-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
//             >
//               <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg">
//                 <i className="ri-user-star-line text-3xl"></i>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">Teacher Portal</h3>
//               <p className="text-gray-600 mb-4">Manage courses, assignments, attendance, and submit grades efficiently.</p>
//               <div className="flex items-center justify-center text-green-600 font-semibold group-hover:text-green-700">
//                 Sign In <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
//               </div>
//             </Link>

//             {/* Admin Portal */}
//             <Link 
//               to="/admin/login" 
//               className="group bg-white p-10 rounded-3xl border-2 border-transparent shadow-lg hover:border-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
//             >
//               <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg">
//                 <i className="ri-admin-line text-3xl"></i>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">Admin Portal</h3>
//               <p className="text-gray-600 mb-4">Full system control, financial overview, and institutional analytics.</p>
//               <div className="flex items-center justify-center text-purple-600 font-semibold group-hover:text-purple-700">
//                 Sign In <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Problem Statement Section - Clarity and Contrast */}
//       <section id="about" className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">The Challenge: Fragmented Systems</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Manual and scattered processes drain resources. We provide one unified solution.
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200 shadow-md">
//               <div className="text-5xl mb-4">📋</div>
//               <h4 className="text-xl font-bold text-red-700 mb-2">Separate Ledgers</h4>
//               <p className="text-red-600">Records scattered across different systems leading to errors and delays.</p>
//             </div>
//             <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200 shadow-md">
//               <div className="text-5xl mb-4">⏰</div>
//               <h4 className="text-xl font-bold text-red-700 mb-2">Long Queues</h4>
//               <p className="text-red-600">Students waste time visiting multiple counters for services.</p>
//             </div>
//             <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200 shadow-md">
//               <div className="text-5xl mb-4">📝</div>
//               <h4 className="text-xl font-bold text-red-700 mb-2">Data Re-entry</h4>
//               <p className="text-red-600">Staff manually enter the same data into multiple systems daily.</p>
//             </div>
//             <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200 shadow-md">
//               <div className="text-5xl mb-4">👨‍💼</div>
//               <h4 className="text-xl font-bold text-red-700 mb-2">No Real-time Overview</h4>
//               <p className="text-red-600">Decision-makers lack instant access to vital institutional metrics.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Solution/Workflow - Flow and Energy */}
//       <section id="solutions" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Unified Workflow</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Seamlessly connect all administrative and academic processes into one flow.
//             </p>
//           </div>
//           <div className="flex flex-wrap justify-center items-center gap-y-10 lg:gap-x-16">
//             {workflow.map((item, index) => (
//               <React.Fragment key={index}>
//                 <div className="flex flex-col items-center">
//                   <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-extrabold text-blue-600 mb-4 shadow-xl border-4 border-blue-600/50">
//                     <span className="absolute inset-0 bg-blue-600 rounded-full opacity-10"></span>
//                     {item.step}
//                   </div>
//                   <div className="text-center max-w-xs">
//                     <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
//                     <p className="text-gray-600">{item.description}</p>
//                   </div>
//                 </div>
//                 {index < workflow.length - 1 && (
//                   <div className="hidden lg:block text-5xl text-blue-400">
//                     <i className="ri-arrow-right-line"></i>
//                   </div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features - Detailed and Clean Grid */}
//       <section id="features" className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Key Features</h2>
//             <p className="text-xl text-gray-600">The toolset for a smart, future-ready institution.</p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-white p-8 rounded-3xl border-t-4 border-blue-600/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
//                 <div className="text-6xl mb-6 text-center">{feature.icon}</div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
//                 <p className="text-gray-600 leading-relaxed text-center">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section - Professional and Highlighted */}
//       <section id="pricing" className="py-24 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
//             <p className="text-xl text-gray-600">No hidden costs. Affordable plans designed for every college size.</p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//             {/* Basic Plan */}
//             <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-md">
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
//               <p className="text-gray-600 mb-6">Perfect for new/small colleges</p>
//               <div className="text-5xl font-extrabold text-blue-600 mb-6">₹15,000<span className="text-xl text-gray-500 font-medium">/year</span></div>
//               <ul className="space-y-4 mb-10">
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>Up to 500 students</li>
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>Admission & Fee modules</li>
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>Email support (24hr SLA)</li>
//                 <li className="flex items-center text-gray-400"><span className="text-gray-400 mr-3 text-lg">✗</span>Custom Integrations</li>
//               </ul>
//               <button className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg">
//                 Choose Basic
//               </button>
//             </div>

//             {/* Pro Plan - Highlighted */}
//             <div className="bg-white p-10 rounded-3xl border-4 border-blue-500 shadow-2xl transition-all duration-300 transform scale-105 relative z-10">
//               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                 <span className="bg-red-500 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg">Most Popular</span>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-2 pt-2">Professional</h3>
//               <p className="text-gray-600 mb-6">Ideal for growing institutions</p>
//               <div className="text-5xl font-extrabold text-blue-600 mb-6">₹35,000<span className="text-xl text-gray-500 font-medium">/year</span></div>
//               <ul className="space-y-4 mb-10">
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>Up to 2000 students</li>
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>**All Modules** included</li>
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>Priority chat/call support</li>
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>Custom integrations</li>
//               </ul>
//               <button className="w-full bg-red-500 text-white py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors shadow-xl">
//                 Start Pro Trial
//               </button>
//             </div>

//             {/* Enterprise Plan */}
//             <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-md">
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
//               <p className="text-gray-600 mb-6">For large institutions with custom needs</p>
//               <div className="text-5xl font-extrabold text-blue-600 mb-6">₹75,000<span className="text-xl text-gray-500 font-medium">/year</span></div>
//               <ul className="space-y-4 mb-10">
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>Unlimited students</li>
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>Advanced analytics suite</li>
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>24/7 Dedicated phone support</li>
//                 <li className="flex items-center text-gray-700 font-medium"><span className="text-green-500 mr-3 text-lg">✓</span>On-site training & support</li>
//               </ul>
//               <button className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg">
//                 Contact Sales
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section - Strong Conclusion */}
//       <section className="py-24 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-5xl font-extrabold mb-6 tracking-tight">Ready to Transform Your Institution?</h2>
//           <p className="text-xl mb-10 text-blue-100">
//             Join hundreds of colleges already using our smart ERP solution.
//             Start your free trial now and experience the efficiency.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-5 justify-center">
//             <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
//               Start Your Free Trial
//             </button>
//             <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
//               Request a Custom Quote
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer - Detailed and Useful */}
//       <footer id="contact" className="bg-gray-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-5 gap-10 mb-12">
//             
//             {/* Branding/About */}
//             <div className="md:col-span-2">
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
//                   <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"/>
//                   </svg>
//                 </div>
//                 <h4 className="text-2xl font-extrabold">Smart College ERP</h4>
//               </div>
//               <p className="text-gray-400 mb-6">Simplifying education management through intelligent automation. Built with purpose for SIH 2025.</p>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><i className="ri-twitter-fill text-xl"></i></a>
//                 <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><i className="ri-facebook-fill text-xl"></i></a>
//                 <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors"><i className="ri-instagram-line text-xl"></i></a>
//                 <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors"><i className="ri-linkedin-fill text-xl"></i></a>
//               </div>
//             </div>
//             
//             {/* Features */}
//             <div>
//               <h4 className="text-lg font-bold mb-4 text-blue-400">Products</h4>
//               <ul className="space-y-3 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">Admissions</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Finance & Fees</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Hostel Management</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
//               </ul>
//             </div>
//             
//             {/* Company */}
//             <div>
//               <h4 className="text-lg font-bold mb-4 text-blue-400">Company</h4>
//               <ul className="space-y-3 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Our Vision</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
//               </ul>
//             </div>
//             
//             {/* Contact */}
//             <div>
//               <h4 className="text-lg font-bold mb-4 text-blue-400">Contact</h4>
//               <div className="space-y-3 text-gray-400">
//                 <p className="flex items-center"><i className="ri-mail-line mr-2 text-lg"></i> support@smartcollegeerp.com</p>
//                 <p className="flex items-center"><i className="ri-phone-line mr-2 text-lg"></i> +91 98765 43210</p>
//                 <p className="flex items-start"><i className="ri-map-pin-line mr-2 text-lg pt-1"></i> Tech Park, Bangalore, India</p>
//               </div>
//             </div>
//           </div>
//           
//           <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500">
//             <p className="text-sm">&copy; 2025 Smart College ERP. All rights reserved. | <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> | <a href="#" className="hover:text-white transition-colors">Terms of Service</a></p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;


import React, { useState } from 'react';

// This is a single-file React component.
// All components, hooks, and logic are contained within this file.
// Links are converted to anchor tags for single-file compatibility.

// We assume Lucide React icons are available in the environment.
const GraduationCap = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v4" />
    <path d="M18 12v4" />
    <path d="M2 17l10 5 10-5" />
    <path d="M12 2L6 5" />
    <path d="M12 2L18 5" />
  </svg>
);

const UserCheck = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

const BarChart3 = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20V10" />
    <path d="M18 20V4" />
    <path d="M6 20v-4" />
  </svg>
);

const LayoutDashboard = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const Banknote = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

const Lock = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Cloud = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.5 17.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
    <path d="M12.5 17.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
    <path d="M7.5 17.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
    <path d="M12.5 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
    <path d="M7.5 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
    <path d="M17.5 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
  </svg>
);


const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <GraduationCap size={48} />,
      title: 'Streamlined Admissions',
      description: 'Automated admission intake with digital forms, document verification, and instant confirmation. No more queues or paperwork.'
    },
    {
      icon: <Banknote size={48} />,
      title: 'Automated Fee Collection',
      description: 'Digital receipts, payment tracking, and automated notifications. Real-time financial overview for administrators.'
    },
    {
      icon: <UserCheck size={48} />,
      title: 'Smart Hostel Management',
      description: 'Live occupancy tracking, room allocation, and maintenance requests. Complete hostel ecosystem management.'
    },
    {
      icon: <LayoutDashboard size={48} />,
      title: 'Real-time Dashboards',
      description: 'Comprehensive analytics and reporting for administrators. Key metrics and institutional overview at a glance.'
    },
    {
      icon: <Lock size={48} />,
      title: 'Secure & Role-based',
      description: 'Built-in security with role-based access control. Data protection and regular backups ensure safety.'
    },
    {
      icon: <Cloud size={48} />,
      title: 'Cloud-based Solution',
      description: 'Leverages familiar cloud office suites. Low-cost, scalable solution that any college can implement.'
    }
  ];

  const benefits = [
    { stat: '80%', label: 'Reduction in Administrative Time' },
    { stat: '95%', label: 'Data Accuracy Improvement' },
    { stat: '70%', label: 'Cost Savings vs Traditional ERP' },
    { stat: '24/7', label: 'System Availability' }
  ];

  const workflow = [
    {
      step: '1',
      title: 'Admission Intake',
      description: 'Students apply through digital forms'
    },
    {
      step: '2',
      title: 'Data Integration',
      description: 'Information flows to central database'
    },
    {
      step: '3',
      title: 'Automated Processing',
      description: 'Fees, hostel, library records update automatically'
    },
    {
      step: '4',
      title: 'Real-time Insights',
      description: 'Administrators access live dashboards'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <style>
        {`
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Navbar - Refined Look */}
      <nav className="fixed w-full z-30 bg-white/80 backdrop-blur-sm shadow-lg rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-inter">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-extrabold text-blue-900 flex items-center">
                  <svg className="h-8 w-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z" />
                  </svg>
                  Smart College <span className="text-blue-600 ml-1">ERP</span>
                </span>
              </div>
            </div>
            <div className="hidden md:flex space-x-8 text-lg font-medium">
              <a href="#features" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Features</a>
              <a href="#solutions" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Workflow</a>
              <a href="#pricing" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Pricing</a>
              <a href="#contact" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Contact</a>
            </div>
            <div className="hidden md:block">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Sign In
              </a>
            </div>
            <button
              className="md:hidden text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Elevated and Vibrant */}
      <section id="home" className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white pt-20 overflow-hidden font-inter">
        {/* Abstract Background Shapes for extra visual flair */}
        <div className="absolute top-0 right-0 h-96 w-96 bg-blue-300 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 h-64 w-64 bg-blue-300 opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
                Smart College ERP
                <span className="text-blue-300 block lg:inline"> Transformed.</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-10 text-blue-100 leading-relaxed max-w-xl lg:max-w-full mx-auto">
                Transform your institution with an integrated, cloud-based ERP system.
                Streamline admissions, fee collection, hostel management, and more—
                all without breaking the budget.
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ring-4 ring-blue-300 ring-opacity-50">
                  Get Started Today
                </button>
                {/* <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
                  Watch Demo
                </button> */}
              {/* </div> */} 
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Clean and Bold */}
      <section className="bg-blue-50 py-16 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-4 border-r border-blue-200 last:border-r-0"
              >
                <h3 className="text-5xl lg:text-6xl font-extrabold text-blue-700 mb-2 leading-none">
                  {benefit.stat}
                </h3>
                <p className="text-lg text-blue-900 font-medium">{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Access Section - Visually Engaging with Hover Effects */}
      <section className="py-20 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Access Your Portal</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Secure, role-based access for your entire academic community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Student Portal */}
            <a
              href="#"
              className="group bg-slate-50 p-10 rounded-3xl border-2 border-transparent shadow-lg hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Student Portal</h3>
              <p className="text-slate-600 mb-4">Access forms, pay fees, view records, and manage your academic life.</p>
              <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700">
                Sign In <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </a>

            {/* Teacher Portal */}
            <a
              href="#"
              className="group bg-slate-50 p-10 rounded-3xl border-2 border-transparent shadow-lg hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 14a12 12 0 00-1.8 1.45A.5.5 0 005.6 18H18.4a.5.5 0 00.4-.15 12 12 0 00-1.8-1.45H5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Teacher Portal</h3>
              <p className="text-slate-600 mb-4">Manage courses, assignments, attendance, and submit grades efficiently.</p>
              <div className="flex items-center justify-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                Sign In <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </a>

            {/* Admin Portal */}
            <a
              href="#"
              className="group bg-slate-50 p-10 rounded-3xl border-2 border-transparent shadow-lg hover:border-cyan-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 14a12 12 0 00-1.8 1.45A.5.5 0 005.6 18H18.4a.5.5 0 00.4-.15 12 12 0 00-1.8-1.45H5zM22 13h-4v-2h4v2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Admin Portal</h3>
              <p className="text-slate-600 mb-4">Full system control, financial overview, and institutional analytics.</p>
              <div className="flex items-center justify-center text-cyan-600 font-semibold group-hover:text-cyan-700">
                Sign In <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Problem Statement Section - Clarity and Contrast */}
      <section id="about" className="py-24 bg-blue-50 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Challenge: Fragmented Systems</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Manual and scattered processes drain resources. We provide one unified solution.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl border border-blue-200 shadow-md">
              <div className="text-5xl mb-4 text-blue-500">📋</div>
              <h4 className="text-xl font-bold text-blue-700 mb-2">Separate Ledgers</h4>
              <p className="text-slate-600">Records scattered across different systems leading to errors and delays.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl border border-blue-200 shadow-md">
              <div className="text-5xl mb-4 text-blue-500">⏰</div>
              <h4 className="text-xl font-bold text-blue-700 mb-2">Long Queues</h4>
              <p className="text-slate-600">Students waste time visiting multiple counters for services.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl border border-blue-200 shadow-md">
              <div className="text-5xl mb-4 text-blue-500">📝</div>
              <h4 className="text-xl font-bold text-blue-700 mb-2">Data Re-entry</h4>
              <p className="text-slate-600">Staff manually enter the same data into multiple systems daily.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl border border-blue-200 shadow-md">
              <div className="text-5xl mb-4 text-blue-500">👨‍💼</div>
              <h4 className="text-xl font-bold text-blue-700 mb-2">No Real-time Overview</h4>
              <p className="text-slate-600">Decision-makers lack instant access to vital institutional metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution/Workflow - Flow and Energy */}
      <section id="solutions" className="py-24 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Unified Workflow</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Seamlessly connect all administrative and academic processes into one flow.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-y-10 lg:gap-x-16">
            {workflow.map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-4xl font-extrabold text-blue-600 mb-4 shadow-xl border-4 border-blue-600/50">
                    <span className="absolute inset-0 bg-blue-600 rounded-full opacity-10"></span>
                    {item.step}
                  </div>
                  <div className="text-center max-w-xs">
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block text-5xl text-blue-400">
                    &rarr;
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Detailed and Clean Grid */}
      <section id="features" className="py-24 bg-blue-50 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Comprehensive Key Features</h2>
            <p className="text-xl text-slate-600">The toolset for a smart, future-ready institution.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl border-t-4 border-blue-600/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
                <div className="text-blue-600 flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Professional and Highlighted */}
      <section id="pricing" className="py-24 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600">No hidden costs. Affordable plans designed for every college size.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-blue-50 p-10 rounded-3xl border border-blue-200 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic</h3>
              <p className="text-slate-600 mb-6">Perfect for new/small colleges</p>
              <div className="text-5xl font-extrabold text-blue-600 mb-6">₹15,000<span className="text-xl text-slate-500 font-medium">/year</span></div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>Up to 500 students</li>
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>Admission & Fee modules</li>
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>Email support (24hr SLA)</li>
                <li className="flex items-center text-slate-400"><span className="text-slate-400 mr-3 text-lg">✗</span>Custom Integrations</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg">
                Choose Basic
              </button>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="bg-white p-10 rounded-3xl border-4 border-blue-500 shadow-2xl transition-all duration-300 transform scale-105 relative z-10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 pt-2">Professional</h3>
              <p className="text-slate-600 mb-6">Ideal for growing institutions</p>
              <div className="text-5xl font-extrabold text-blue-600 mb-6">₹35,000<span className="text-xl text-slate-500 font-medium">/year</span></div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>Up to 2000 students</li>
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>**All Modules** included</li>
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>Priority chat/call support</li>
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>Custom integrations</li>
              </ul>
              <button className="w-full bg-blue-500 text-white py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-colors shadow-xl">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-blue-50 p-10 rounded-3xl border border-blue-200 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
              <p className="text-slate-600 mb-6">For large institutions with custom needs</p>
              <div className="text-5xl font-extrabold text-blue-600 mb-6">₹75,000<span className="text-xl text-slate-500 font-medium">/year</span></div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>Unlimited students</li>
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>Advanced analytics suite</li>
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>24/7 Dedicated phone support</li>
                <li className="flex items-center text-slate-700 font-medium"><span className="text-blue-500 mr-3 text-lg">✓</span>On-site training & support</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Strong Conclusion */}
      <section className="py-24 bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 text-white font-inter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold mb-6 tracking-tight">Ready to Transform Your Institution?</h2>
          <p className="text-xl mb-10 text-blue-100">
            Join hundreds of colleges already using our smart ERP solution.
            Start your free trial now and experience the efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="bg-blue-400 hover:bg-blue-500 text-blue-900 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Your Free Trial
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
              Request a Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Detailed and Useful */}
      <footer id="contact" className="bg-slate-900 text-white py-16 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-10 mb-12">

            {/* Branding/About */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-extrabold">Smart College ERP</h4>
              </div>
              <p className="text-slate-400 mb-6">Simplifying education management through intelligent automation. Built with purpose for SIH 2025.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.54 6.37c-.6.27-1.25.45-1.93.53a3.95 3.95 0 00-2.85-1.2c-2.34 0-4.25 1.9-4.25 4.25s1.9 4.25 4.25 4.25a3.95 3.95 0 002.85-1.2c.68.12 1.33.25 1.93.53a8.9 8.9 0 01-5.32 1.95c-5.18 0-9.4-4.22-9.4-9.4s4.22-9.4 9.4-9.4a8.9 8.9 0 015.32 1.95z" /></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2h2v4h-2V2zM18 2h2v4h-2V2zM10 2h2v4h-2V2zM2 22h4v-2H2v2zM2 18h4v-2H2v2zM2 14h4v-2H2v2zM2 10h4v-2H2v2zM2 6h4V4H2v2zM2 2h4v-2H2v2zM10 22h4v-2h-4v2zM10 18h4v-2h-4v2zM10 14h4v-2h-4v2zM10 10h4v-2h-4v2zM10 6h4V4h-4v2zM10 2h2v2h-2V2zM18 22h4v-2h-4v2zM18 18h4v-2h-4v2zM18 14h4v-2h-4v2zM18 10h4v-2h-4v2zM18 6h4V4h-4v2z" /></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM8 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                </a>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Products</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Admissions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Finance & Fees</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hostel Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Company</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Vision</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Contact</h4>
              <div className="space-y-3 text-slate-400">
                <p className="flex items-center"><span className="mr-2 text-lg">📧</span> support@smartcollegeerp.com</p>
                <p className="flex items-center"><span className="mr-2 text-lg">📞</span> +91 98765 43210</p>
                <p className="flex items-start"><span className="mr-2 text-lg pt-1">📍</span> Tech Park, Bangalore, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 mt-8 text-center text-slate-500">
            <p className="text-sm">&copy; 2025 Smart College ERP. All rights reserved. | <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> | <a href="#" className="hover:text-white transition-colors">Terms of Service</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
