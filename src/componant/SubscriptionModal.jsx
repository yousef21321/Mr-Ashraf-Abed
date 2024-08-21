import React, { useState, useEffect } from "react";
import "./subscriptionModal.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubscriptionModal = ({ course, onClose }) => {
  const [subscriptionCode, setSubscriptionCode] = useState("");
  const [ipAddress, setIpAddress] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch IP address
  const fetchIPAddress = async () => {
    try {
      const res = await axios.get('https://api.ipify.org?format=json');
      setIpAddress(res.data.ip);
      console.log("IP Address:", res.data.ip);
    } catch (err) {
      console.error('Error fetching IP address:', err);
      setError('Could not fetch IP address');
    }
  };

  // Fetch IP address on component mount
  useEffect(() => {
    fetchIPAddress();
  }, []);

  // Function to handle form submission
  const handleSubmit = async () => {
    const id = localStorage.getItem('id');
    const lesson_id = localStorage.getItem('package_id');
    const deviceFingerprint = localStorage.getItem('deviceFingerprint');

    // Ensure all parameters are provided
    if (!subscriptionCode || !id || !lesson_id || !ipAddress) {
      setError('Please provide all required fields.');
      return;
    }
  
    // Log the request data for debugging
    const requestData = {
      code: subscriptionCode,
      user_id: id,
      lesson_id: lesson_id,
      mac_address: deviceFingerprint,
    };
    console.log("Request Data:", requestData);
  
    try {
      const response = await axios.post(
        'https://leader-acadmy.hwnix.com/api/codes/validate',
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
  
      console.log("API Response:", response.data);
  
      if (response.data.message === "Code validated and updated successfully.") {
        console.log("Code validated successfully");
        setError('تم تفعيل المحاضره');
        navigate('/PricingCard'); // Navigate on success
        localStorage.setItem('subscriptionCode', subscriptionCode); // Store subscriptionCode in localStorage
      } else {
        setError("الكود غير صالح او يوجد مشكله فى الكود.");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      if (error.response && error.response.data.message === "Code is already used.") {
        setError("غلط ياض");
      } else {
        console.log(error.response);
        console.log(error.response.data.message);
        setError(error.response ? error.response.data.message : "من فضلك ادخل الكود");
      }
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>&times;</span>
        <h2>رجاء دخلى كود الاشتراك</h2>
        <input
          type='text'
          value={subscriptionCode}
          onChange={(e) => setSubscriptionCode(e.target.value)}
          placeholder='أدخل كود الاشتراك'
        />
        <button onClick={handleSubmit}>إرسال</button>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  );
};

export default SubscriptionModal;
