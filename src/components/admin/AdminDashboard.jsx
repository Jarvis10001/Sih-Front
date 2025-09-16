import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import TeacherForm from './TeacherForm';
import ClerkForm from './ClerkForm';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [teachers, setTeachers] = useState([]);
    const [clerks, setClerks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAddTeacher, setShowAddTeacher] = useState(false);
    const [showAddClerk, setShowAddClerk] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [editingClerk, setEditingClerk] = useState(null);
    const [adminData, setAdminData] = useState(null);

    const [clerkForm, setClerkForm] = useState({
        employeeId: '',
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            gender: '',
            dateOfBirth: '',
            address: {
                street: '',
                city: '',
                state: '',
                pincode: ''
            },
            emergencyContact: {
                name: '',
                relationship: '',
                phone: ''
            }
        },
        professionalInfo: {
            designation: '',
            department: '',
            joiningDate: '',
            experience: 0,
            workShift: 'Morning',
            reportingTo: '',
            salary: {
                basic: 0,
                allowances: 0,
                total: 0
            }
        },
        systemAccess: {
            modules: [],
            accessLevel: 'read'
        },
        password: '',
        isActive: true
    });

    const [teacherForm, setTeacherForm] = useState({
        teacherId: '',
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        designation: '',
        department: '',
        joiningDate: '',
        employeeType: '',
        experience: '',
        salary: '',
        subjects: '',
        qualification: '',
        specialization: '',
        researchInterests: '',
        publications: '',
        password: ''
    });

    useEffect(() => {
        // Check if admin is logged in
        const token = localStorage.getItem('adminToken');
        const admin = localStorage.getItem('adminData');
        
        if (!token || !admin) {
            navigate('/admin/login');
            return;
        }

        setAdminData(JSON.parse(admin));
        fetchTeachers();
        fetchClerks();
    }, [navigate]);

    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/teachers`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setTeachers(response.data.teachers);
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
            setError('Failed to fetch teachers');
        } finally {
            setLoading(false);
        }
    };

    const fetchClerks = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/clerks`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setClerks(response.data.clerks);
            }
        } catch (error) {
            console.error('Error fetching clerks:', error);
            setError('Failed to fetch clerks');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
    };

    const handleTeacherSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            let response;
            if (editingTeacher) {
                // Update teacher
                response = await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admin/teachers/${editingTeacher._id}`,
                    teacherForm,
                    config
                );
            } else {
                // Create new teacher
                response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admin/teachers`,
                    teacherForm,
                    config
                );
            }

            if (response.data.success) {
                setShowAddTeacher(false);
                setEditingTeacher(null);
                setTeacherForm({
                    teacherId: '',
                    name: '',
                    email: '',
                    phone: '',
                    dateOfBirth: '',
                    gender: '',
                    address: '',
                    designation: '',
                    department: '',
                    joiningDate: '',
                    employeeType: '',
                    experience: '',
                    salary: '',
                    subjects: '',
                    qualification: '',
                    specialization: '',
                    researchInterests: '',
                    publications: '',
                    password: ''
                });
                fetchTeachers();
            }
        } catch (error) {
            console.error('Error saving teacher:', error);
            setError(error.response?.data?.message || 'Failed to save teacher');
        } finally {
            setLoading(false);
        }
    };

    const handleClerkSubmit = async (clerkData, profilePhoto) => {
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            let response;
            if (editingClerk) {
                // Update clerk
                response = await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admin/clerks/${editingClerk._id}`,
                    clerkData,
                    config
                );
            } else {
                // Create new clerk
                response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admin/clerks`,
                    clerkData,
                    config
                );
            }

            if (response.data.success) {
                setShowAddClerk(false);
                setEditingClerk(null);
                setClerkForm({
                    employeeId: '',
                    personalInfo: {
                        fullName: '',
                        email: '',
                        phone: '',
                        gender: '',
                        dateOfBirth: '',
                        address: {
                            street: '',
                            city: '',
                            state: '',
                            pincode: ''
                        },
                        emergencyContact: {
                            name: '',
                            relationship: '',
                            phone: ''
                        }
                    },
                    professionalInfo: {
                        designation: '',
                        department: '',
                        joiningDate: '',
                        experience: 0,
                        workShift: 'Morning',
                        reportingTo: '',
                        salary: {
                            basic: 0,
                            allowances: 0,
                            total: 0
                        }
                    },
                    systemAccess: {
                        modules: [],
                        accessLevel: 'read'
                    },
                    password: '',
                    isActive: true
                });
                fetchClerks();
            }
        } catch (error) {
            console.error('Error saving clerk:', error);
            setError(error.response?.data?.message || 'Failed to save clerk');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTeacher = async (teacherId) => {
        if (!window.confirm('Are you sure you want to delete this teacher?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/teachers/${teacherId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                fetchTeachers();
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
            setError('Failed to delete teacher');
        }
    };

    const handleDeleteClerk = async (clerkId) => {
        if (!window.confirm('Are you sure you want to delete this clerk?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/clerks/${clerkId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                fetchClerks();
            }
        } catch (error) {
            console.error('Error deleting clerk:', error);
            setError('Failed to delete clerk');
        }
    };

    const handleEditTeacher = (teacher) => {
        setEditingTeacher(teacher);
        setTeacherForm({
            teacherId: teacher.teacherId,
            name: teacher.name,
            email: teacher.email,
            phone: teacher.phone,
            dateOfBirth: teacher.dateOfBirth ? teacher.dateOfBirth.split('T')[0] : '',
            gender: teacher.gender || '',
            address: teacher.address || '',
            designation: teacher.designation || '',
            department: teacher.department || '',
            joiningDate: teacher.joiningDate ? teacher.joiningDate.split('T')[0] : '',
            employeeType: teacher.employeeType || '',
            experience: teacher.experience || '',
            salary: teacher.salary || '',
            subjects: teacher.subjects?.join(', ') || '',
            qualification: teacher.qualification || '',
            specialization: teacher.specialization || '',
            researchInterests: teacher.researchInterests || '',
            publications: teacher.publications || '',
            password: ''
        });
        setShowAddTeacher(true);
    };

    const handleEditClerk = (clerk) => {
        setEditingClerk(clerk);
        setClerkForm({
            employeeId: clerk.employeeId || '',
            personalInfo: {
                fullName: clerk.personalInfo?.fullName || '',
                email: clerk.personalInfo?.email || '',
                phone: clerk.personalInfo?.phone || '',
                gender: clerk.personalInfo?.gender || '',
                dateOfBirth: clerk.personalInfo?.dateOfBirth ? clerk.personalInfo.dateOfBirth.split('T')[0] : '',
                address: {
                    street: clerk.personalInfo?.address?.street || '',
                    city: clerk.personalInfo?.address?.city || '',
                    state: clerk.personalInfo?.address?.state || '',
                    pincode: clerk.personalInfo?.address?.pincode || ''
                },
                emergencyContact: {
                    name: clerk.personalInfo?.emergencyContact?.name || '',
                    relationship: clerk.personalInfo?.emergencyContact?.relationship || '',
                    phone: clerk.personalInfo?.emergencyContact?.phone || ''
                }
            },
            professionalInfo: {
                designation: clerk.professionalInfo?.designation || '',
                department: clerk.professionalInfo?.department || '',
                joiningDate: clerk.professionalInfo?.joiningDate ? clerk.professionalInfo.joiningDate.split('T')[0] : '',
                experience: clerk.professionalInfo?.experience || 0,
                workShift: clerk.professionalInfo?.workShift || 'Morning',
                reportingTo: clerk.professionalInfo?.reportingTo || '',
                salary: {
                    basic: clerk.professionalInfo?.salary?.basic || 0,
                    allowances: clerk.professionalInfo?.salary?.allowances || 0,
                    total: clerk.professionalInfo?.salary?.total || 0
                }
            },
            systemAccess: {
                modules: clerk.systemAccess?.modules || [],
                accessLevel: clerk.systemAccess?.accessLevel || 'read'
            },
            password: '',
            isActive: clerk.isActive !== false
        });
        setShowAddClerk(true);
    };

    const renderOverview = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                        <p className="text-3xl font-bold text-gray-900">{teachers.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <i className="ri-team-line text-blue-600 text-xl"></i>
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
                        <p className="text-sm font-medium text-gray-600">Total Clerks</p>
                        <p className="text-3xl font-bold text-gray-900">{clerks.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <i className="ri-user-settings-line text-green-600 text-xl"></i>
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
                        <p className="text-sm font-medium text-gray-600">Active Staff</p>
                        <p className="text-3xl font-bold text-gray-900">
                            {teachers.filter(t => t.status === 'active').length + clerks.filter(c => c.isActive).length}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <i className="ri-user-star-line text-purple-600 text-xl"></i>
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
                        <p className="text-sm font-medium text-gray-600">Departments</p>
                        <p className="text-3xl font-bold text-gray-900">
                            {new Set([
                                ...teachers.map(t => t.department).filter(Boolean),
                                ...clerks.map(c => c.professionalInfo?.department).filter(Boolean)
                            ]).size}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <i className="ri-building-line text-orange-600 text-xl"></i>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    const renderTeachers = () => (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Teacher Management</h3>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddTeacher(true)}
                        className="bg-[#4CAF50] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#45a049] transition-colors flex items-center gap-2"
                    >
                        <i className="ri-add-line"></i>
                        Add Teacher
                    </motion.button>
                </div>
            </div>

            {loading ? (
                <div className="p-8 text-center">
                    <i className="ri-loader-4-line animate-spin text-2xl text-gray-400 mb-2"></i>
                    <p className="text-gray-600">Loading teachers...</p>
                </div>
            ) : teachers.length === 0 ? (
                <div className="p-8 text-center">
                    <i className="ri-team-line text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-600 text-lg font-medium mb-2">No teachers found</p>
                    <p className="text-gray-500">Add your first teacher to get started</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teachers.map((teacher) => (
                                <motion.tr
                                    key={teacher._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center text-white font-semibold">
                                                {teacher.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                                                <div className="text-sm text-gray-500">ID: {teacher.teacherId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{teacher.email}</div>
                                        <div className="text-sm text-gray-500">{teacher.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{teacher.designation}</div>
                                        <div className="text-sm text-gray-500">{teacher.department}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            teacher.status === 'active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditTeacher(teacher)}
                                                className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                                title="Edit Teacher"
                                            >
                                                <i className="ri-edit-line"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTeacher(teacher._id)}
                                                className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                title="Delete Teacher"
                                            >
                                                <i className="ri-delete-bin-line"></i>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    const renderClerks = () => (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Clerk Management</h3>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddClerk(true)}
                        className="bg-[#4CAF50] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#45a049] transition-colors flex items-center gap-2"
                    >
                        <i className="ri-add-line"></i>
                        Add Clerk
                    </motion.button>
                </div>
            </div>

            {loading ? (
                <div className="p-8 text-center">
                    <i className="ri-loader-4-line animate-spin text-2xl text-gray-400 mb-2"></i>
                    <p className="text-gray-600">Loading clerks...</p>
                </div>
            ) : clerks.length === 0 ? (
                <div className="p-8 text-center">
                    <i className="ri-user-settings-line text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-600 text-lg font-medium mb-2">No clerks found</p>
                    <p className="text-gray-500">Add your first clerk to get started</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clerk</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Level</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clerks.map((clerk) => (
                                <motion.tr
                                    key={clerk._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center text-white font-semibold">
                                                {clerk.personalInfo?.fullName?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{clerk.personalInfo?.fullName}</div>
                                                <div className="text-sm text-gray-500">ID: {clerk.employeeId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{clerk.personalInfo?.email}</div>
                                        <div className="text-sm text-gray-500">{clerk.personalInfo?.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{clerk.professionalInfo?.designation}</div>
                                        <div className="text-sm text-gray-500">{clerk.professionalInfo?.department}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            clerk.systemAccess?.accessLevel === 'admin' 
                                                ? 'bg-purple-100 text-purple-800' 
                                                : clerk.systemAccess?.accessLevel === 'write'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {clerk.systemAccess?.accessLevel || 'read'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            clerk.isActive 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {clerk.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditClerk(clerk)}
                                                className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                                title="Edit Clerk"
                                            >
                                                <i className="ri-edit-line"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClerk(clerk._id)}
                                                className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                title="Delete Clerk"
                                            >
                                                <i className="ri-delete-bin-line"></i>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
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
                                <i className="ri-admin-line text-white text-lg"></i>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                                <p className="text-sm text-gray-600">College ERP Administration</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    Welcome, {adminData?.username}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {adminData?.role} Administrator
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-medium hover:bg-red-200 transition-colors flex items-center gap-2"
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
                            { id: 'teachers', label: 'Teachers', icon: 'ri-team-line' },
                            { id: 'clerks', label: 'Clerks', icon: 'ri-user-settings-line' },
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

                    {activeTab === 'teachers' && (
                        <motion.div
                            key="teachers"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {renderTeachers()}
                        </motion.div>
                    )}

                    {activeTab === 'clerks' && (
                        <motion.div
                            key="clerks"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {renderClerks()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Enhanced Teacher Form Modal */}
            <AnimatePresence>
                {showAddTeacher && (
                    <TeacherForm
                        teacherForm={teacherForm}
                        setTeacherForm={setTeacherForm}
                        onSubmit={handleTeacherSubmit}
                        onCancel={() => {
                            setShowAddTeacher(false);
                            setEditingTeacher(null);
                            setTeacherForm({
                                teacherId: '',
                                name: '',
                                email: '',
                                phone: '',
                                dateOfBirth: '',
                                gender: '',
                                address: '',
                                designation: '',
                                department: '',
                                joiningDate: '',
                                employeeType: '',
                                experience: '',
                                salary: '',
                                subjects: '',
                                qualification: '',
                                specialization: '',
                                researchInterests: '',
                                publications: '',
                                password: ''
                            });
                        }}
                        loading={loading}
                        editingTeacher={editingTeacher}
                        error={error}
                    />
                )}
            </AnimatePresence>

            {/* Enhanced Clerk Form Modal */}
            <AnimatePresence>
                {showAddClerk && (
                    <ClerkForm
                        clerkForm={clerkForm}
                        setClerkForm={setClerkForm}
                        onSubmit={handleClerkSubmit}
                        onCancel={() => {
                            setShowAddClerk(false);
                            setEditingClerk(null);
                            setClerkForm({
                                employeeId: '',
                                personalInfo: {
                                    fullName: '',
                                    email: '',
                                    phone: '',
                                    gender: '',
                                    dateOfBirth: '',
                                    address: {
                                        street: '',
                                        city: '',
                                        state: '',
                                        pincode: ''
                                    },
                                    emergencyContact: {
                                        name: '',
                                        relationship: '',
                                        phone: ''
                                    }
                                },
                                professionalInfo: {
                                    designation: '',
                                    department: '',
                                    joiningDate: '',
                                    experience: 0,
                                    workShift: 'Morning',
                                    reportingTo: '',
                                    salary: {
                                        basic: 0,
                                        allowances: 0,
                                        total: 0
                                    }
                                },
                                systemAccess: {
                                    modules: [],
                                    accessLevel: 'read'
                                },
                                password: '',
                                isActive: true
                            });
                        }}
                        loading={loading}
                        editingClerk={editingClerk}
                        error={error}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;