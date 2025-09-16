import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClerkForm = ({ 
    clerkForm, 
    setClerkForm, 
    onSubmit, 
    onCancel, 
    loading, 
    editingClerk,
    error 
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);
    const [formErrors, setFormErrors] = useState({});

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

    const steps = [
        { number: 1, title: "Personal Information", icon: "ri-user-line" },
        { number: 2, title: "Professional Details", icon: "ri-briefcase-line" },
        { number: 3, title: "System Access & Account", icon: "ri-settings-line" }
    ];

    const departments = [
        'Administration',
        'Admissions',
        'Accounts',
        'Library',
        'Student Affairs',
        'Examination',
        'HR',
        'IT Support',
        'Maintenance'
    ];

    const designations = [
        'Office Clerk',
        'Administrative Assistant',
        'Data Entry Clerk',
        'Admission Clerk',
        'Accounts Clerk',
        'Library Assistant',
        'Reception Clerk',
        'Senior Clerk',
        'Office Supervisor'
    ];

    const systemModules = [
        { id: 'student_management', label: 'Student Management' },
        { id: 'admission_processing', label: 'Admission Processing' },
        { id: 'fee_collection', label: 'Fee Collection' },
        { id: 'library_management', label: 'Library Management' },
        { id: 'examination_records', label: 'Examination Records' },
        { id: 'attendance_tracking', label: 'Attendance Tracking' },
        { id: 'document_verification', label: 'Document Verification' },
        { id: 'report_generation', label: 'Report Generation' }
    ];

    const workShifts = ['Morning', 'Evening', 'Night', 'Rotating'];

    const handleStepClick = (stepNumber) => {
        if (stepNumber <= currentStep || validateCurrentStep()) {
            setCurrentStep(stepNumber);
        }
    };

    const validateCurrentStep = () => {
        const errors = {};
        const { personalInfo, professionalInfo, systemAccess } = clerkForm;

        if (currentStep === 1) {
            if (!personalInfo.fullName?.trim()) errors.fullName = 'Full name is required';
            if (!personalInfo.email?.trim()) errors.email = 'Email is required';
            if (!personalInfo.phone?.trim()) errors.phone = 'Phone number is required';
            if (!clerkForm.employeeId?.trim()) errors.employeeId = 'Employee ID is required';
        }

        if (currentStep === 2) {
            if (!professionalInfo.designation) errors.designation = 'Designation is required';
            if (!professionalInfo.department) errors.department = 'Department is required';
            if (!professionalInfo.joiningDate) errors.joiningDate = 'Joining date is required';
        }

        if (currentStep === 3) {
            if (!clerkForm.password?.trim() && !editingClerk) errors.password = 'Password is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const nextStep = () => {
        if (validateCurrentStep() && currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (section, field, value) => {
        setClerkForm(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
        
        // Clear specific error when user starts typing
        if (formErrors[field]) {
            setFormErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const handleDirectChange = (field, value) => {
        setClerkForm(prev => ({
            ...prev,
            [field]: value
        }));
        
        if (formErrors[field]) {
            setFormErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const handleModuleToggle = (moduleId) => {
        const currentModules = clerkForm.systemAccess?.modules || [];
        const updatedModules = currentModules.includes(moduleId)
            ? currentModules.filter(id => id !== moduleId)
            : [...currentModules, moduleId];
        
        handleInputChange('systemAccess', 'modules', updatedModules);
    };

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhoto(file);
            const reader = new FileReader();
            reader.onload = (e) => setProfilePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            onSubmit(clerkForm, profilePhoto);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Employee ID */}
                        <div>
                            <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                Employee ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`${inputClasses} ${formErrors.employeeId ? 'border-red-300' : ''}`}
                                placeholder="Enter employee ID (e.g., CLK001)"
                                value={clerkForm.employeeId || ''}
                                onChange={(e) => handleDirectChange('employeeId', e.target.value)}
                            />
                            {formErrors.employeeId && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.employeeId}</p>
                            )}
                        </div>

                        {/* Personal Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`${inputClasses} ${formErrors.fullName ? 'border-red-300' : ''}`}
                                    placeholder="Enter full name"
                                    value={clerkForm.personalInfo?.fullName || ''}
                                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                                />
                                {formErrors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    className={`${inputClasses} ${formErrors.email ? 'border-red-300' : ''}`}
                                    placeholder="Enter email address"
                                    value={clerkForm.personalInfo?.email || ''}
                                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                                />
                                {formErrors.email && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    className={`${inputClasses} ${formErrors.phone ? 'border-red-300' : ''}`}
                                    placeholder="Enter phone number"
                                    value={clerkForm.personalInfo?.phone || ''}
                                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                                />
                                {formErrors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                                )}
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Gender
                                </label>
                                <select
                                    className={selectClasses}
                                    value={clerkForm.personalInfo?.gender || ''}
                                    onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    className={inputClasses}
                                    value={clerkForm.personalInfo?.dateOfBirth || ''}
                                    onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h4 className="text-lg font-semibold text-[#2E7D33] mb-4">Address Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-[#2E7D33] mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        className={inputClasses}
                                        placeholder="Enter street address"
                                        value={clerkForm.personalInfo?.address?.street || ''}
                                        onChange={(e) => handleInputChange('personalInfo', 'address', { 
                                            ...clerkForm.personalInfo?.address, 
                                            street: e.target.value 
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#2E7D33] mb-2">City</label>
                                    <input
                                        type="text"
                                        className={inputClasses}
                                        placeholder="Enter city"
                                        value={clerkForm.personalInfo?.address?.city || ''}
                                        onChange={(e) => handleInputChange('personalInfo', 'address', { 
                                            ...clerkForm.personalInfo?.address, 
                                            city: e.target.value 
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#2E7D33] mb-2">State</label>
                                    <input
                                        type="text"
                                        className={inputClasses}
                                        placeholder="Enter state"
                                        value={clerkForm.personalInfo?.address?.state || ''}
                                        onChange={(e) => handleInputChange('personalInfo', 'address', { 
                                            ...clerkForm.personalInfo?.address, 
                                            state: e.target.value 
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#2E7D33] mb-2">Pincode</label>
                                    <input
                                        type="text"
                                        className={inputClasses}
                                        placeholder="Enter pincode"
                                        value={clerkForm.personalInfo?.address?.pincode || ''}
                                        onChange={(e) => handleInputChange('personalInfo', 'address', { 
                                            ...clerkForm.personalInfo?.address, 
                                            pincode: e.target.value 
                                        })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h4 className="text-lg font-semibold text-[#2E7D33] mb-4">Emergency Contact</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#2E7D33] mb-2">Contact Name</label>
                                    <input
                                        type="text"
                                        className={inputClasses}
                                        placeholder="Enter contact name"
                                        value={clerkForm.personalInfo?.emergencyContact?.name || ''}
                                        onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', { 
                                            ...clerkForm.personalInfo?.emergencyContact, 
                                            name: e.target.value 
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#2E7D33] mb-2">Relationship</label>
                                    <input
                                        type="text"
                                        className={inputClasses}
                                        placeholder="e.g., Father, Mother, Spouse"
                                        value={clerkForm.personalInfo?.emergencyContact?.relationship || ''}
                                        onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', { 
                                            ...clerkForm.personalInfo?.emergencyContact, 
                                            relationship: e.target.value 
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#2E7D33] mb-2">Contact Phone</label>
                                    <input
                                        type="tel"
                                        className={inputClasses}
                                        placeholder="Enter contact phone"
                                        value={clerkForm.personalInfo?.emergencyContact?.phone || ''}
                                        onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', { 
                                            ...clerkForm.personalInfo?.emergencyContact, 
                                            phone: e.target.value 
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Professional Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Designation */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Designation <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className={`${selectClasses} ${formErrors.designation ? 'border-red-300' : ''}`}
                                    value={clerkForm.professionalInfo?.designation || ''}
                                    onChange={(e) => handleInputChange('professionalInfo', 'designation', e.target.value)}
                                >
                                    <option value="">Select Designation</option>
                                    {designations.map(designation => (
                                        <option key={designation} value={designation}>{designation}</option>
                                    ))}
                                </select>
                                {formErrors.designation && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.designation}</p>
                                )}
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className={`${selectClasses} ${formErrors.department ? 'border-red-300' : ''}`}
                                    value={clerkForm.professionalInfo?.department || ''}
                                    onChange={(e) => handleInputChange('professionalInfo', 'department', e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                                {formErrors.department && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.department}</p>
                                )}
                            </div>

                            {/* Joining Date */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Joining Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    className={`${inputClasses} ${formErrors.joiningDate ? 'border-red-300' : ''}`}
                                    value={clerkForm.professionalInfo?.joiningDate || ''}
                                    onChange={(e) => handleInputChange('professionalInfo', 'joiningDate', e.target.value)}
                                />
                                {formErrors.joiningDate && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.joiningDate}</p>
                                )}
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Experience (Years)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className={inputClasses}
                                    placeholder="Enter years of experience"
                                    value={clerkForm.professionalInfo?.experience || ''}
                                    onChange={(e) => handleInputChange('professionalInfo', 'experience', parseInt(e.target.value) || 0)}
                                />
                            </div>

                            {/* Work Shift */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Work Shift
                                </label>
                                <select
                                    className={selectClasses}
                                    value={clerkForm.professionalInfo?.workShift || 'Morning'}
                                    onChange={(e) => handleInputChange('professionalInfo', 'workShift', e.target.value)}
                                >
                                    {workShifts.map(shift => (
                                        <option key={shift} value={shift}>{shift}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Reporting To */}
                            <div>
                                <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                    Reporting To (Employee ID)
                                </label>
                                <input
                                    type="text"
                                    className={inputClasses}
                                    placeholder="Enter supervisor's employee ID"
                                    value={clerkForm.professionalInfo?.reportingTo || ''}
                                    onChange={(e) => handleInputChange('professionalInfo', 'reportingTo', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Salary Information */}
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h4 className="text-lg font-semibold text-[#2E7D33] mb-4">Salary Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#2E7D33] mb-2">Basic Salary</label>
                                    <input
                                        type="number"
                                        className={inputClasses}
                                        placeholder="Enter basic salary"
                                        value={clerkForm.professionalInfo?.salary?.basic || ''}
                                        onChange={(e) => handleInputChange('professionalInfo', 'salary', { 
                                            ...clerkForm.professionalInfo?.salary, 
                                            basic: parseFloat(e.target.value) || 0 
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#2E7D33] mb-2">Allowances</label>
                                    <input
                                        type="number"
                                        className={inputClasses}
                                        placeholder="Enter allowances"
                                        value={clerkForm.professionalInfo?.salary?.allowances || ''}
                                        onChange={(e) => handleInputChange('professionalInfo', 'salary', { 
                                            ...clerkForm.professionalInfo?.salary, 
                                            allowances: parseFloat(e.target.value) || 0 
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#2E7D33] mb-2">Total Salary</label>
                                    <input
                                        type="number"
                                        className={inputClasses}
                                        placeholder="Enter total salary"
                                        value={clerkForm.professionalInfo?.salary?.total || ''}
                                        onChange={(e) => handleInputChange('professionalInfo', 'salary', { 
                                            ...clerkForm.professionalInfo?.salary, 
                                            total: parseFloat(e.target.value) || 0 
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* System Access */}
                        <div>
                            <label className="block text-sm font-semibold text-[#2E7D33] mb-4">
                                System Modules Access
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {systemModules.map(module => (
                                    <label key={module.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-[#4CAF50] border-gray-300 rounded focus:ring-[#4CAF50]"
                                            checked={clerkForm.systemAccess?.modules?.includes(module.id) || false}
                                            onChange={() => handleModuleToggle(module.id)}
                                        />
                                        <span className="text-sm text-gray-700">{module.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Access Level */}
                        <div>
                            <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                Access Level
                            </label>
                            <select
                                className={selectClasses}
                                value={clerkForm.systemAccess?.accessLevel || 'read'}
                                onChange={(e) => handleInputChange('systemAccess', 'accessLevel', e.target.value)}
                            >
                                <option value="read">Read Only</option>
                                <option value="write">Read & Write</option>
                                <option value="admin">Administrative</option>
                            </select>
                        </div>

                        {/* Account Credentials */}
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h4 className="text-lg font-semibold text-[#2E7D33] mb-4">Account Credentials</h4>
                            <div className="space-y-4">
                                {!editingClerk && (
                                    <div>
                                        <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className={`${inputClasses} ${formErrors.password ? 'border-red-300' : ''}`}
                                            placeholder="Enter password"
                                            value={clerkForm.password || ''}
                                            onChange={(e) => handleDirectChange('password', e.target.value)}
                                        />
                                        {formErrors.password && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        className="w-4 h-4 text-[#4CAF50] border-gray-300 rounded focus:ring-[#4CAF50]"
                                        checked={clerkForm.isActive !== false}
                                        onChange={(e) => handleDirectChange('isActive', e.target.checked)}
                                    />
                                    <label htmlFor="isActive" className="text-sm text-gray-700">
                                        Account is active
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Profile Photo */}
                        <div>
                            <label className="block text-sm font-semibold text-[#2E7D33] mb-2">
                                Profile Photo
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                                    {profilePreview ? (
                                        <img src={profilePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <i className="ri-user-line text-2xl"></i>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePhotoChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4CAF50] file:text-white hover:file:bg-[#45a049]"
                                />
                            </div>
                        </div>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#2E7D33] mb-2">
                    {editingClerk ? 'Edit Clerk' : 'Add New Clerk'}
                </h2>
                <p className="text-gray-600">
                    {editingClerk ? 'Update clerk information' : 'Fill in the details to add a new clerk to the system'}
                </p>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            {/* Step Indicator */}
            <div className="flex justify-center mb-8">
                <div className="flex space-x-4">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className={`flex items-center space-x-2 cursor-pointer transition-all duration-300 ${
                                currentStep >= step.number ? 'text-[#4CAF50]' : 'text-gray-400'
                            }`}
                            onClick={() => handleStepClick(step.number)}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                currentStep >= step.number 
                                    ? 'bg-[#4CAF50] text-white shadow-lg' 
                                    : 'bg-gray-200 text-gray-400'
                            }`}>
                                <i className={step.icon}></i>
                            </div>
                            <span className="hidden md:block font-medium">{step.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
                <AnimatePresence mode="wait">
                    {renderStepContent()}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <div>
                        {currentStep > 1 && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
                            >
                                Previous
                            </motion.button>
                        )}
                    </div>
                    
                    <div className="flex space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
                        >
                            Cancel
                        </motion.button>
                        
                        {currentStep < 3 ? (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-3 bg-[#4CAF50] text-white rounded-xl font-semibold hover:bg-[#45a049] transition-colors duration-300 shadow-lg"
                            >
                                Next
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                                    loading
                                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                        : 'bg-[#4CAF50] text-white hover:bg-[#45a049]'
                                }`}
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>{editingClerk ? 'Updating...' : 'Creating...'}</span>
                                    </div>
                                ) : (
                                    editingClerk ? 'Update Clerk' : 'Create Clerk'
                                )}
                            </motion.button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ClerkForm;