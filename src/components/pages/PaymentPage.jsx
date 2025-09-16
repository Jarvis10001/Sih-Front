import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [admissionData, setAdmissionData] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [fees, setFees] = useState({
        admissionFee: 50000,
        registrationFee: 5000,
        securityDeposit: 10000,
        total: 65000
    });

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

    // Check payment status and admission data on component mount
    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                
                if (!token) {
                    navigate('/login');
                    return;
                }

                setUser(userData);

                // Check if admission form is submitted
                const admissionResponse = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admission/status`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                if (!admissionResponse.data.success) {
                    // Redirect to admission form if not submitted
                    navigate('/dashboard/admission');
                    return;
                }

                setAdmissionData(admissionResponse.data.admission);

                // Check payment status
                try {
                    const paymentResponse = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/api/payment/status`,
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );

                    if (paymentResponse.data.success) {
                        setPaymentStatus(paymentResponse.data.payment);
                    }
                } catch (error) {
                    // No payment found yet, that's fine
                    if (error.response?.status !== 404) {
                        console.error('Error checking payment status:', error);
                    }
                }

            } catch (error) {
                console.error('Error in payment status check:', error);
                if (error.response?.status === 404) {
                    // No admission found, redirect to admission form
                    navigate('/dashboard/admission');
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkPaymentStatus();
    }, [navigate]);

    // Load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setPaymentLoading(true);

        try {
            // Load Razorpay script
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                alert('Failed to load payment gateway. Please try again.');
                return;
            }

            const token = localStorage.getItem('token');

            // Create payment order
            const orderResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
                {
                    amount: fees.total,
                    currency: 'INR',
                    receipt: `admission_${admissionData.id}_${Date.now()}`
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const { order } = orderResponse.data;

            // Razorpay options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay key ID
                amount: order.amount,
                currency: order.currency,
                name: 'College ERP',
                description: 'Admission Fee Payment',
                image: '/logo.png', // Your college logo
                order_id: order.id,
                prefill: {
                    name: user?.name || admissionData?.personalInfo?.name,
                    email: user?.email || admissionData?.personalInfo?.email,
                    contact: admissionData?.personalInfo?.mobileNo
                },
                theme: {
                    color: '#4CAF50'
                },
                handler: async function (response) {
                    try {
                        // Verify payment
                        const verifyResponse = await axios.post(
                            `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                admission_id: admissionData.id
                            },
                            {
                                headers: { Authorization: `Bearer ${token}` }
                            }
                        );

                        if (verifyResponse.data.success) {
                            setPaymentStatus({
                                status: 'completed',
                                paymentId: response.razorpay_payment_id,
                                orderId: response.razorpay_order_id,
                                amount: fees.total,
                                paidAt: new Date()
                            });
                            alert('Payment successful! Your admission is confirmed.');
                        } else {
                            alert('Payment verification failed. Please contact support.');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                modal: {
                    ondismiss: function () {
                        console.log('Payment modal closed');
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error('Payment error:', error);
            alert('Failed to initiate payment. Please try again.');
        } finally {
            setPaymentLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50]"></div>
            </div>
        );
    }

    if (paymentStatus && paymentStatus.status === 'completed') {
        return (
            <div className="max-w-4xl mx-auto my-10 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    {/* Success Header */}
                    <div className="relative h-32 bg-gradient-to-r from-green-500/20 to-green-600/20">
                        <div className="absolute inset-0 px-8 py-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#333333] mb-1">
                                        Payment Successful!
                                    </h2>
                                    <p className="text-[#6C757D] text-sm">
                                        Your admission fee has been paid successfully
                                    </p>
                                </div>
                                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <i className="ri-check-line text-2xl text-green-600"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="ri-check-line text-3xl text-green-600"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-[#333333] mb-2">Admission Confirmed!</h3>
                            <p className="text-[#6C757D]">
                                Your payment has been processed and your admission is now confirmed.
                            </p>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-[#F8F9F4] rounded-xl p-6 mb-6">
                            <h4 className="text-lg font-semibold text-[#333333] mb-4">Payment Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-[#6C757D]">Payment ID</p>
                                    <p className="font-medium text-[#333333]">{paymentStatus.paymentId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#6C757D]">Order ID</p>
                                    <p className="font-medium text-[#333333]">{paymentStatus.orderId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#6C757D]">Amount Paid</p>
                                    <p className="font-medium text-[#333333]">₹{paymentStatus.amount?.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#6C757D]">Payment Date</p>
                                    <p className="font-medium text-[#333333]">
                                        {new Date(paymentStatus.paidAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="flex-1 px-6 py-3 bg-[#4CAF50] text-white rounded-xl font-semibold hover:bg-[#45a049] transition-colors"
                            >
                                Go to Dashboard
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="px-6 py-3 border-2 border-[#4CAF50] text-[#4CAF50] rounded-xl font-semibold hover:bg-[#4CAF50]/10 transition-colors"
                            >
                                Print Receipt
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            {/* Notification banner */}
            <div className="mb-6 bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                        <i className="ri-information-line text-xl text-[#4CAF50]"></i>
                    </div>
                    <div>
                        <h4 className="text-[#333333] font-medium">Admission Fee Payment</h4>
                        <p className="text-[#6C757D] text-sm">
                            Complete your admission by paying the required fees. Your admission will be confirmed after successful payment.
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
                                    Payment Portal
                                </h2>
                                <p className="text-[#6C757D] text-sm">
                                    Secure payment for your college admission
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <i className="ri-bank-card-line text-2xl text-[#4CAF50]"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {/* Student Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/50 rounded-xl p-6 backdrop-blur-sm border border-gray-100 shadow-sm mb-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center">
                                <i className="ri-user-line text-xl text-[#4CAF50]"></i>
                            </div>
                            <h3 className="text-xl font-bold text-[#333333]">Student Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[#333333] font-medium block mb-1">Student Name</label>
                                <input
                                    type="text"
                                    value={admissionData?.personalInfo?.name || ''}
                                    className={inputClasses}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-[#333333] font-medium block mb-1">Application ID</label>
                                <input
                                    type="text"
                                    value={admissionData?.applicationNumber || 'N/A'}
                                    className={inputClasses}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-[#333333] font-medium block mb-1">Course</label>
                                <input
                                    type="text"
                                    value={admissionData?.academicInfo?.course || ''}
                                    className={inputClasses}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-[#333333] font-medium block mb-1">Branch</label>
                                <input
                                    type="text"
                                    value={admissionData?.academicInfo?.branch || ''}
                                    className={inputClasses}
                                    readOnly
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Fee Structure */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/50 rounded-xl p-6 backdrop-blur-sm border border-gray-100 shadow-sm mb-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center">
                                <i className="ri-money-rupee-circle-line text-xl text-[#4CAF50]"></i>
                            </div>
                            <h3 className="text-xl font-bold text-[#333333]">Fee Structure</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-[#333333] font-medium">Admission Fee</span>
                                <span className="text-[#333333] font-semibold">₹{fees.admissionFee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-[#333333] font-medium">Registration Fee</span>
                                <span className="text-[#333333] font-semibold">₹{fees.registrationFee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-[#333333] font-medium">Security Deposit</span>
                                <span className="text-[#333333] font-semibold">₹{fees.securityDeposit.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-4 bg-[#4CAF50]/10 rounded-lg px-4">
                                <span className="text-[#333333] font-bold text-lg">Total Amount</span>
                                <span className="text-[#4CAF50] font-bold text-xl">₹{fees.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Methods */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/50 rounded-xl p-6 backdrop-blur-sm border border-gray-100 shadow-sm mb-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center">
                                <i className="ri-secure-payment-line text-xl text-[#4CAF50]"></i>
                            </div>
                            <h3 className="text-xl font-bold text-[#333333]">Secure Payment</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200">
                                <img src="/api/placeholder/60/40" alt="Visa" className="h-8" />
                            </div>
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200">
                                <img src="/api/placeholder/60/40" alt="Mastercard" className="h-8" />
                            </div>
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200">
                                <img src="/api/placeholder/60/40" alt="UPI" className="h-8" />
                            </div>
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200">
                                <img src="/api/placeholder/60/40" alt="Net Banking" className="h-8" />
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-[#6C757D] mb-4">
                                <i className="ri-shield-check-line text-[#4CAF50] mr-1"></i>
                                Payments are secured by SSL encryption and processed through Razorpay
                            </p>
                        </div>
                    </motion.div>

                    {/* Payment Button */}
                    <div className="pt-6 border-t border-gray-100">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handlePayment}
                            disabled={paymentLoading}
                            className={`w-full p-4 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/20 transition-all duration-300 ${paymentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                {paymentLoading ? (
                                    <>
                                        <i className="ri-loader-4-line animate-spin"></i>
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <i className="ri-secure-payment-line"></i>
                                        Pay ₹{fees.total.toLocaleString()} - Secure Payment
                                    </>
                                )}
                            </span>
                        </motion.button>
                        
                        <p className="text-center mt-4 text-sm text-[#6C757D]">
                            By proceeding with payment, you agree to our{' '}
                            <a href="#" className="text-[#4CAF50] hover:text-[#45a049] underline">
                                Terms and Conditions
                            </a>
                            {' '}and{' '}
                            <a href="#" className="text-[#4CAF50] hover:text-[#45a049] underline">
                                Refund Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;