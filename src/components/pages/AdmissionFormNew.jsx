import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdmissionForm = () => {
    const navigate = useNavigate();
    const inputClasses = `
        w-full p-3 rounded-xl 
        bg-[#F8F9F4] border-2 border-transparent
        focus:border-[#4CAF50]
        focus:ring-4 focus:ring-[#4CAF50]/10 
        focus:bg-white
        hover:border-[#4CAF50]/30
        transition-all duration-300 ease-in-out
        text-[#333333] placeholder-[#6C757D]/60
        focus:placeholder-[#4CAF50]/50
        focus:shadow-lg focus:shadow-[#4CAF50]/5
        outline-none
    `;

    const selectClasses = inputClasses + ` appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,${encodeURIComponent(
        `<svg width="20" height="20" fill="none" stroke="%234CAF50" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`
    )}')] bg-[length:20px_20px] bg-no-repeat bg-[center_right_1rem] pr-12`;

    const [documents, setDocuments] = useState({
        tenthMarksheet: null,
        twelfthMarksheet: null,
        medicalCertificate: null,
        jeeResult: null,
        categoryCertificate: null,
        aadharCard: null,
        photo: null,
        signature: null
    });

    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [filePreviews, setFilePreviews] = useState({});

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

    const courseOptions = [
        'B.Tech', 'M.Tech', 'B.Sc', 'M.Sc', 'BCA', 'MCA', 'MBA', 'B.Com', 'M.Com', 'BA', 'MA'
    ];

    const branchOptions = {
        'B.Tech': ['Computer Science Engineering', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics & Communication', 'Chemical Engineering', 'Aerospace Engineering'],
        'M.Tech': ['Computer Science', 'Information Technology', 'VLSI Design', 'Power Systems', 'Structural Engineering', 'Thermal Engineering'],
        'B.Sc': ['Computer Science', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Biotechnology'],
        'M.Sc': ['Computer Science', 'Physics', 'Chemistry', 'Mathematics', 'Biotechnology']
    };

    const categoryOptions = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS'];

    const stateOptions = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
        'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
        'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
        'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Chandigarh'
    ];

    const validateFile = (file) => {
        if (!file) return 'Please select a file';
        if (file.size > MAX_FILE_SIZE) {
            return 'File size must be less than 5MB';
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return 'Only JPEG, PNG and PDF files are allowed';
        }
        return null;
    };

    // Check admission status on component mount
    useEffect(() => {
        const checkAdmissionStatus = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');
                
                if (!token) {
                    navigate('/login');
                    return;
                }

                // Check if user has already submitted admission form
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admission/status`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                if (response.data.success && response.data.admission) {
                    setSubmitted(true);
                }
            } catch (error) {
                // If no admission found (404), that's fine - user can submit
                if (error.response?.status !== 404) {
                    console.error('Error checking admission status:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAdmissionStatus();
    }, [navigate]);

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const error = validateFile(file);
            if (error) {
                setErrors(prev => ({ ...prev, [fieldName]: error }));
                e.target.value = '';
                return;
            }

            setDocuments(prev => ({ ...prev, [fieldName]: file }));

            // Create preview
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFilePreviews(prev => ({ ...prev, [fieldName]: reader.result }));
                };
                reader.readAsDataURL(file);
            } else if (file.type === 'application/pdf') {
                setFilePreviews(prev => ({ ...prev, [fieldName]: 'pdf' }));
            }

            // Clear error
            if (errors[fieldName]) {
                setErrors(prev => ({ ...prev, [fieldName]: '' }));
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('border-[#4CAF50]', 'bg-[#4CAF50]/5');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('border-[#4CAF50]', 'bg-[#4CAF50]/5');
    };

    const handleDrop = (e, fieldName) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('border-[#4CAF50]', 'bg-[#4CAF50]/5');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            const error = validateFile(file);
            if (error) {
                setErrors(prev => ({ ...prev, [fieldName]: error }));
                return;
            }

            setDocuments(prev => ({ ...prev, [fieldName]: file }));

            // Create preview
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFilePreviews(prev => ({ ...prev, [fieldName]: reader.result }));
                };
                reader.readAsDataURL(file);
            } else if (file.type === 'application/pdf') {
                setFilePreviews(prev => ({ ...prev, [fieldName]: 'pdf' }));
            }

            // Clear error
            if (errors[fieldName]) {
                setErrors(prev => ({ ...prev, [fieldName]: '' }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        
        try {
            const formData = new FormData();
            const formElements = e.target.elements;
            
            // Extract form data
            const admissionData = {
                name: formElements.namedItem("name").value,
                fatherName: formElements.namedItem("father-name").value,
                motherName: formElements.namedItem("mother-name").value,
                gender: formElements.namedItem("gender").value,
                dateOfBirth: formElements.namedItem("dob").value,
                mobileNo: formElements.namedItem("mobile").value,
                parentsMobileNo: formElements.namedItem("parents-mobile").value,
                email: formElements.namedItem("email").value,
                address: formElements.namedItem("address").value,
                city: formElements.namedItem("city").value,
                state: formElements.namedItem("state").value,
                pincode: formElements.namedItem("pincode").value,
                isOtherState: formElements.namedItem("is-other-state")?.checked || false,
                course: formElements.namedItem("course").value,
                branch: formElements.namedItem("branch").value,
                tenthBoard: formElements.namedItem("tenth-board").value,
                tenthPercentage: formElements.namedItem("tenth-percentage").value,
                tenthYearOfPassing: formElements.namedItem("tenth-year").value,
                twelfthBoard: formElements.namedItem("twelfth-board").value,
                twelfthPercentage: formElements.namedItem("twelfth-percentage").value,
                twelfthYearOfPassing: formElements.namedItem("twelfth-year").value,
                jeeRollNo: formElements.namedItem("jee-roll")?.value || '',
                jeeRank: formElements.namedItem("jee-rank")?.value || '',
                jeeScore: formElements.namedItem("jee-score")?.value || '',
                category: formElements.namedItem("category").value,
                aadharNo: formElements.namedItem("aadhar").value,
                bloodGroup: formElements.namedItem("blood-group")?.value || '',
                religion: formElements.namedItem("religion")?.value || '',
                nationality: formElements.namedItem("nationality")?.value || 'Indian'
            };

            // Append form data
            Object.keys(admissionData).forEach(key => {
                formData.append(key, admissionData[key]);
            });

            // Append documents
            Object.keys(documents).forEach(key => {
                if (documents[key]) {
                    formData.append(key, documents[key]);
                }
            });

            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admission/submit`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert(error.response?.data?.message || 'Form submission failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50]"></div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-auto"
                >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-check-line text-2xl text-green-600"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Form Submitted Successfully!</h2>
                    <p className="text-gray-600 mb-4">
                        Your admission form has been submitted. You will receive a confirmation email shortly.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            {/* Notification banner */}
            <div className="mb-6 bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                        <i className="ri-information-line text-xl text-[#4CAF50]"></i>
                    </div>
                    <div>
                        <h4 className="text-[#333333] font-medium">College Admission Form</h4>
                        <p className="text-[#6C757D] text-sm">
                            Please complete this admission form with accurate information. This form will be submitted only once.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="relative h-32 bg-gradient-to-r from-[#4CAF50]/20 to-[#45a049]/20">
                    <div className="absolute inset-0 px-8 py-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-1">
                                    Admission Form
                                </h2>
                                <p className="text-[#6C757D] text-sm">
                                    Please fill in all the required information carefully
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <i className="ri-graduation-cap-line text-2xl text-[#4CAF50]"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Form Heading */}
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-bold text-[#333333]">COLLEGE ADMISSION APPLICATION</h3>
                        <p className="text-sm text-[#6C757D] mt-1">
                            Application ID: ADM-{new Date().getFullYear()}-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="space-y-8">
                            {/* Personal Information */}
                            <FormSection
                                icon="ri-user-line"
                                title="Personal Information"
                                content={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            label="Full Name*"
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            className={inputClasses}
                                            required
                                        />
                                        <FormField
                                            label="Father's Name*"
                                            type="text"
                                            name="father-name"
                                            placeholder="Enter father's name"
                                            className={inputClasses}
                                            required
                                        />
                                        <FormField
                                            label="Mother's Name*"
                                            type="text"
                                            name="mother-name"
                                            placeholder="Enter mother's name"
                                            className={inputClasses}
                                            required
                                        />
                                        <div className="space-y-2">
                                            <label className="text-[#333333] font-medium block">Gender*</label>
                                            <select className={selectClasses} name="gender" required>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <FormField
                                            label="Date of Birth*"
                                            type="date"
                                            name="dob"
                                            className={inputClasses}
                                            required
                                        />
                                        <FormField
                                            label="Mobile Number*"
                                            type="tel"
                                            name="mobile"
                                            placeholder="Enter 10-digit mobile number"
                                            className={inputClasses}
                                            pattern="[0-9]{10}"
                                            required
                                        />
                                        <FormField
                                            label="Parents Mobile Number*"
                                            type="tel"
                                            name="parents-mobile"
                                            placeholder="Enter parents mobile number"
                                            className={inputClasses}
                                            pattern="[0-9]{10}"
                                            required
                                        />
                                        <FormField
                                            label="Email Address*"
                                            type="email"
                                            name="email"
                                            placeholder="Enter email address"
                                            className={inputClasses}
                                            required
                                        />
                                        <FormField
                                            label="Aadhar Number*"
                                            type="text"
                                            name="aadhar"
                                            placeholder="Enter 12-digit Aadhar number"
                                            className={inputClasses}
                                            pattern="[0-9]{12}"
                                            required
                                        />
                                        <div className="space-y-2">
                                            <label className="text-[#333333] font-medium block">Blood Group</label>
                                            <select className={selectClasses} name="blood-group">
                                                <option value="">Select Blood Group</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        </div>
                                        <FormField
                                            label="Religion"
                                            type="text"
                                            name="religion"
                                            placeholder="Enter religion"
                                            className={inputClasses}
                                        />
                                        <FormField
                                            label="Nationality"
                                            type="text"
                                            name="nationality"
                                            placeholder="Enter nationality"
                                            className={inputClasses}
                                            defaultValue="Indian"
                                        />
                                    </div>
                                }
                            />

                            {/* Address Information */}
                            <FormSection
                                icon="ri-map-pin-line"
                                title="Address Information"
                                content={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <FormField
                                                label="Address*"
                                                type="text"
                                                name="address"
                                                placeholder="Enter complete address"
                                                className={inputClasses}
                                                required
                                            />
                                        </div>
                                        <FormField
                                            label="City*"
                                            type="text"
                                            name="city"
                                            placeholder="Enter city"
                                            className={inputClasses}
                                            required
                                        />
                                        <div className="space-y-2">
                                            <label className="text-[#333333] font-medium block">State*</label>
                                            <select className={selectClasses} name="state" required>
                                                <option value="">Select State</option>
                                                {stateOptions.map(state => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <FormField
                                            label="PIN Code*"
                                            type="text"
                                            name="pincode"
                                            placeholder="Enter PIN code"
                                            className={inputClasses}
                                            pattern="[0-9]{6}"
                                            required
                                        />
                                        <div className="md:col-span-2">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    name="is-other-state"
                                                    className="rounded border-gray-300 text-[#4CAF50] focus:ring-[#4CAF50]"
                                                />
                                                <span className="text-sm text-gray-700">Student from other state</span>
                                            </label>
                                        </div>
                                    </div>
                                }
                            />

                            {/* Academic Information */}
                            <FormSection
                                icon="ri-book-line"
                                title="Academic Information"
                                content={
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[#333333] font-medium block">Course*</label>
                                            <select className={selectClasses} name="course" required>
                                                <option value="">Select Course</option>
                                                {courseOptions.map(course => (
                                                    <option key={course} value={course}>{course}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[#333333] font-medium block">Branch*</label>
                                            <select className={selectClasses} name="branch" required>
                                                <option value="">Select Branch</option>
                                                {/* This would be populated based on selected course */}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[#333333] font-medium block">Category*</label>
                                            <select className={selectClasses} name="category" required>
                                                <option value="">Select Category</option>
                                                {categoryOptions.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* 10th Class Details */}
                                        <div className="lg:col-span-3">
                                            <h4 className="text-lg font-medium text-gray-800 mb-3 mt-4">10th Class Details</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <FormField
                                                    label="Board*"
                                                    type="text"
                                                    name="tenth-board"
                                                    placeholder="e.g., CBSE, ICSE, State Board"
                                                    className={inputClasses}
                                                    required
                                                />
                                                <FormField
                                                    label="Percentage*"
                                                    type="number"
                                                    name="tenth-percentage"
                                                    placeholder="Enter percentage"
                                                    className={inputClasses}
                                                    min="0"
                                                    max="100"
                                                    step="0.01"
                                                    required
                                                />
                                                <FormField
                                                    label="Year of Passing*"
                                                    type="number"
                                                    name="tenth-year"
                                                    placeholder="e.g., 2020"
                                                    className={inputClasses}
                                                    min="2000"
                                                    max="2030"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* 12th Class Details */}
                                        <div className="lg:col-span-3">
                                            <h4 className="text-lg font-medium text-gray-800 mb-3 mt-4">12th Class Details</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <FormField
                                                    label="Board*"
                                                    type="text"
                                                    name="twelfth-board"
                                                    placeholder="e.g., CBSE, ICSE, State Board"
                                                    className={inputClasses}
                                                    required
                                                />
                                                <FormField
                                                    label="Percentage*"
                                                    type="number"
                                                    name="twelfth-percentage"
                                                    placeholder="Enter percentage"
                                                    className={inputClasses}
                                                    min="0"
                                                    max="100"
                                                    step="0.01"
                                                    required
                                                />
                                                <FormField
                                                    label="Year of Passing*"
                                                    type="number"
                                                    name="twelfth-year"
                                                    placeholder="e.g., 2022"
                                                    className={inputClasses}
                                                    min="2000"
                                                    max="2030"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* JEE Details */}
                                        <div className="lg:col-span-3">
                                            <h4 className="text-lg font-medium text-gray-800 mb-3 mt-4">JEE Details (If Applicable)</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <FormField
                                                    label="JEE Roll Number"
                                                    type="text"
                                                    name="jee-roll"
                                                    placeholder="Enter JEE roll number"
                                                    className={inputClasses}
                                                />
                                                <FormField
                                                    label="JEE Rank"
                                                    type="number"
                                                    name="jee-rank"
                                                    placeholder="Enter JEE rank"
                                                    className={inputClasses}
                                                    min="1"
                                                />
                                                <FormField
                                                    label="JEE Score"
                                                    type="number"
                                                    name="jee-score"
                                                    placeholder="Enter JEE score"
                                                    className={inputClasses}
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                            />

                            {/* Document Upload Section */}
                            <FormSection
                                icon="ri-upload-line"
                                title="Document Upload"
                                content={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <DocumentUpload
                                            label="10th Class Marksheet*"
                                            fieldName="tenthMarksheet"
                                            file={documents.tenthMarksheet}
                                            preview={filePreviews.tenthMarksheet}
                                            onChange={(e) => handleFileChange(e, 'tenthMarksheet')}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'tenthMarksheet')}
                                            error={errors.tenthMarksheet}
                                            required
                                        />
                                        <DocumentUpload
                                            label="12th Class Marksheet*"
                                            fieldName="twelfthMarksheet"
                                            file={documents.twelfthMarksheet}
                                            preview={filePreviews.twelfthMarksheet}
                                            onChange={(e) => handleFileChange(e, 'twelfthMarksheet')}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'twelfthMarksheet')}
                                            error={errors.twelfthMarksheet}
                                            required
                                        />
                                        <DocumentUpload
                                            label="Medical Fitness Certificate*"
                                            fieldName="medicalCertificate"
                                            file={documents.medicalCertificate}
                                            preview={filePreviews.medicalCertificate}
                                            onChange={(e) => handleFileChange(e, 'medicalCertificate')}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'medicalCertificate')}
                                            error={errors.medicalCertificate}
                                            required
                                        />
                                        <DocumentUpload
                                            label="JEE Result (For Engineering)"
                                            fieldName="jeeResult"
                                            file={documents.jeeResult}
                                            preview={filePreviews.jeeResult}
                                            onChange={(e) => handleFileChange(e, 'jeeResult')}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'jeeResult')}
                                            error={errors.jeeResult}
                                        />
                                        <DocumentUpload
                                            label="Category Certificate (If Applicable)"
                                            fieldName="categoryCertificate"
                                            file={documents.categoryCertificate}
                                            preview={filePreviews.categoryCertificate}
                                            onChange={(e) => handleFileChange(e, 'categoryCertificate')}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'categoryCertificate')}
                                            error={errors.categoryCertificate}
                                        />
                                        <DocumentUpload
                                            label="Aadhar Card*"
                                            fieldName="aadharCard"
                                            file={documents.aadharCard}
                                            preview={filePreviews.aadharCard}
                                            onChange={(e) => handleFileChange(e, 'aadharCard')}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'aadharCard')}
                                            error={errors.aadharCard}
                                            required
                                        />
                                        <DocumentUpload
                                            label="Passport Size Photo*"
                                            fieldName="photo"
                                            file={documents.photo}
                                            preview={filePreviews.photo}
                                            onChange={(e) => handleFileChange(e, 'photo')}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'photo')}
                                            error={errors.photo}
                                            required
                                            accept=".jpg,.jpeg,.png"
                                        />
                                        <DocumentUpload
                                            label="Signature"
                                            fieldName="signature"
                                            file={documents.signature}
                                            preview={filePreviews.signature}
                                            onChange={(e) => handleFileChange(e, 'signature')}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, 'signature')}
                                            error={errors.signature}
                                            accept=".jpg,.jpeg,.png"
                                        />
                                    </div>
                                }
                            />

                            {/* Submit Button */}
                            <div className="pt-8 border-t border-gray-100">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    disabled={isUploading}
                                    className={`w-full p-4 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/20 transition-all duration-300 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {isUploading ? (
                                            <>
                                                <i className="ri-loader-4-line animate-spin"></i>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <i className="ri-save-line"></i>
                                                Submit Admission Form
                                            </>
                                        )}
                                    </span>
                                </motion.button>
                                <p className="text-center mt-4 text-sm text-[#6C757D]">
                                    By submitting this form, you agree to our{' '}
                                    <a href="#" className="text-[#4CAF50] hover:text-[#45a049] underline">
                                        Terms and Conditions
                                    </a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Form Section Component
const FormSection = ({ icon, title, content }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 rounded-xl p-6 backdrop-blur-sm border border-gray-100 shadow-sm"
    >
        <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center">
                <i className={`${icon} text-xl text-[#4CAF50]`}></i>
            </div>
            <h3 className="text-xl font-bold text-[#333333]">{title}</h3>
        </div>
        {content}
    </motion.div>
);

// FormField Component
const FormField = ({ label, type, name, placeholder, pattern, className, required, defaultValue, min, max, step }) => (
    <div className="space-y-2">
        <label className="text-[#333333] font-medium block">
            {label}
        </label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            pattern={pattern}
            className={className}
            required={required}
            defaultValue={defaultValue}
            min={min}
            max={max}
            step={step}
        />
    </div>
);

// Document Upload Component
const DocumentUpload = ({ 
    label, 
    fieldName, 
    file, 
    preview, 
    onChange, 
    onDragOver, 
    onDragLeave, 
    onDrop, 
    error, 
    required = false,
    accept = ".jpeg,.jpg,.png,.pdf"
}) => {
    const removeFile = () => {
        // This would need to be passed as a prop or handled differently
        // For now, just reset the input
        const input = document.querySelector(`input[name="${fieldName}"]`);
        if (input) input.value = '';
    };

    return (
        <div className="space-y-2">
            <label className="text-[#333333] font-medium block">
                {label}
            </label>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center w-full">
                    <label 
                        className={`flex flex-col w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                            ${file ? 'border-[#4CAF50] bg-[#4CAF50]/5' : 'border-gray-300 bg-[#F8F9F4]'} 
                            hover:bg-[#F1F3F1] transition-colors duration-300`}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {!file ? (
                                <>
                                    <svg className="w-8 h-8 mb-4 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="mb-2 text-sm text-[#6C757D]">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-[#6C757D]">JPG, PNG, PDF (Max 5MB)</p>
                                </>
                            ) : (
                                <div className="flex items-center gap-2 text-[#4CAF50]">
                                    <i className="ri-check-line text-xl"></i>
                                    <span className="text-sm font-medium">{file.name}</span>
                                </div>
                            )}
                        </div>
                        <input 
                            type="file" 
                            name={fieldName}
                            className="hidden" 
                            accept={accept}
                            onChange={onChange}
                            required={required}
                        />
                    </label>
                </div>

                {/* File Preview */}
                {file && (
                    <div className="relative bg-white p-4 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-4">
                            {preview === 'pdf' ? (
                                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center">
                                    <i className="ri-file-pdf-line text-2xl text-[#4CAF50]"></i>
                                </div>
                            ) : preview ? (
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center">
                                    <i className="ri-file-line text-2xl text-[#4CAF50]"></i>
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="text-sm font-medium text-[#333333]">{file.name}</p>
                                <p className="text-xs text-[#6C757D]">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                            >
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                    </div>
                )}

                {/* Error message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default AdmissionForm;