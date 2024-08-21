import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs'; // Make sure to install this package
import facebookImage from './Assets/facebook.svg';
import youtube from './Assets/social-icons-white-youtube.svg';
import web from './Assets/social-icons-white-dribbble.svg';
import Twitter from './Assets/social-icons-white-twitter.svg';
import insta from './Assets/social-icons-white-instagram.svg';
import './ProfileCard.css';
import SubscriptionModal from "./SubscriptionModal";

const SocialIcon = ({ src, alt, href }) => (
  <div className="social-icon">
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={src} alt={alt} />
    </a>
  </div>
);

const ProfileCard = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceFingerprint, setDeviceFingerprint] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get('https://leader-acadmy.hwnix.com/api/getlessons/1', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setLessons(response.data.lessons);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDeviceFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setDeviceFingerprint(result.visitorId);
        localStorage.setItem('deviceFingerprint', result.visitorId); // Store deviceFingerprint in localStorage
      } catch (err) {
        console.error('Error fetching device fingerprint:', err);
        setErrorMessages(prev => ({ ...prev, global: 'Could not fetch device fingerprint' }));
      }
    };

    fetchLessons();
    fetchDeviceFingerprint();
  }, []);

  const handleSubmit = async (lesson) => {
    localStorage.setItem('lesson_id', lesson.id); // Store lesson_id in localStorage

    const id = localStorage.getItem('id');
    const lesson_id = localStorage.getItem('lesson_id');
    const subscriptionCode = localStorage.getItem('subscriptionCode');

    try {
      const response = await fetch(`https://leader-acadmy.hwnix.com/api/code/check/${id}/${deviceFingerprint}/${lesson_id}?code=${subscriptionCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.message === "User has a valid code.") {
          navigate('/landing-page');
        } else if (result.message === "MAC address mismatch." || result.message === "No code found for this user and lesson.") {
          setErrorMessages(prev => ({ ...prev, [lesson.id]: "تاكد من دخول من جهاز واحد." }));
          handleSubscribeClick(lesson); // Ensure this function is defined if used
        } else {
          setErrorMessages(prev => ({ ...prev, [lesson.id]: "الكود غير صالح او يوجد مشكله فى الكود." }));
        }
      } else {
        setErrorMessages(prev => ({ ...prev, [lesson.id]: "تاكد من دخول من جهاز واحد." }));
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessages(prev => ({ ...prev, [lesson.id]: "من فضلك ادخل الكود" }));
    }
  };

  const handleSubscribeClick = (lesson) => {
    localStorage.setItem('lesson_id', lesson.id); // Store lesson_id in localStorage

    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleCreateAccount = () => {
    // Your create account logic
  };

  return (
    <div className="profile">
      <header className="Header">
        <div className="header-content">
          <button className="create-button" onClick={handleCreateAccount}>تسجيل الخروج</button>
          <div className="socias-links">
            <SocialIcon src={facebookImage} alt="Facebook" href="https://www.facebook.com/AshrafAbed2020/photos" />
            <SocialIcon src={youtube} alt="YouTube" href="https://www.youtube.com/channel/UC2_e1-9trV5x3beP_wXQfpw" />
          </div>
          <div className="nav-buttons">
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/about" className="nav-button">About</Link>
            <Link to="/lecture" className="nav-button">Lecture</Link>
          </div>
          <div className="name">أ.اشرف عابد</div>
        </div>
      </header>
    </div>
  );
};

export default ProfileCard;
