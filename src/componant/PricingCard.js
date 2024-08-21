import React, { useState, useEffect } from 'react';
import './PricingCard.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SubscriptionModal from './SubscriptionModal';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import facebookImage from './Assets/facebook.svg';
import youtube from './Assets/social-icons-white-youtube.svg';
import Footer from './Footer';

const SocialIcon = ({ src, alt, href }) => (
  <div className="social-icon">
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={src} alt={alt} />
    </a>
  </div>
);

const PricingCard = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceFingerprint, setDeviceFingerprint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const educationalLevelId = localStorage.getItem('educationalLevelId');
        const authToken = localStorage.getItem('authToken');

        if (!authToken || !educationalLevelId) {
          navigate('/login');
          return;
        }

        const response = await axios.get(
          `https://leader-acadmy.hwnix.com/api/getPackages/1/${educationalLevelId}`, 
          {
            headers: { Authorization: `Bearer ${authToken}` }
          }
        );
        setLessons(response.data.packages || []);
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
        localStorage.setItem('deviceFingerprint', result.visitorId);
      } catch (err) {
        setErrorMessages(prev => ({ ...prev, global: 'Could not fetch device fingerprint' }));
        navigate('/login');
      }
    };

    fetchLessons();
    fetchDeviceFingerprint();
  }, [navigate]);

  const handleSubscribeClick = (lesson) => {
    localStorage.setItem('package_id', lesson.id);
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleEnterClick = async (lesson) => {
    localStorage.setItem('package_id', lesson.id);

    const id = localStorage.getItem('id');
    const subscriptionCode = localStorage.getItem('subscriptionCode');
    const deviceFingerprint = localStorage.getItem('deviceFingerprint');
    
    try {
      const response = await axios.get(
        `https://leader-acadmy.hwnix.com/api/code/check/${id}/${deviceFingerprint}/${lesson.id}?code=${subscriptionCode}`
      );
      const result = response.data;
    
      if (result.message === "User has a valid code.") {
        navigate('/ProfileCard');
      } else if (error.response.data.message === "MAC address mismatch." || error.response.data.message === "No code found for this user and lesson.") {
        setErrorMessages(prev => ({ ...prev, [lesson.id]: "برجاء الدخول من اول جهاز تم الاشتراك عليه" }));
        // handleSubscribeClick(lesson);
      } else {
        setErrorMessages(prev => ({ ...prev, [lesson.id]: "الكود غير صالح أو يوجد مشكلة في الكود." }));
      }
    } catch (error) {
      // Check if error.response exists and has data
       if (error.response.data.message === "MAC address mismatch." || error.response.data.message === "No code found for this user and lesson.") {
        console.log(error.response.data.message);
        setErrorMessages(prev => ({ ...prev, [lesson.id]:"برجاء الدخول من اول جهاز تم الاشتراك عليه" }));

      } else {
        console.log(error.message); // For network or other errors
        setErrorMessages(prev => ({ ...prev, [lesson.id]: "من فضلك ادخل الكود." }));

      }
    
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      await axios.post('https://leader-acadmy.hwnix.com/api/logout', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      localStorage.clear();
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      navigate('/login');
    }
  };

  return (
    <>
      <div className="profile-card">
        <header className="profile-header">
          <div className="profile-header-content">
            <button className="nav-button create-account-button" onClick={handleLogout}>تسجيل الخروج</button>
            <div className="social-links">
              <SocialIcon src={facebookImage} alt="Facebook" href="https://www.facebook.com/AshrafAbed2020/photos" />
              <SocialIcon src={youtube} alt="YouTube" href="https://www.youtube.com/channel/UC2_e1-9trV5x3beP_wXQfpw" />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Link to="/" style={styles.link}><button style={styles.button}>Home</button></Link>
              <Link to="/" style={styles.link}><button style={styles.button}>About</button></Link>
            </div>
            <div className="profile-name">Mr.Ashraf Abed</div>
          </div>
        </header>

        <div className="pricing-cards">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading lessons: {error.message}</p>
          ) : (
            lessons.map(lesson => (
              <div key={lesson.id} className="card">
                <div className="card-header">
                  <h2>{lesson.title}</h2>
                </div>
                <div className="card-body">
                  <p className="lesson-description">{lesson.description}</p>
                  {errorMessages[lesson.id] && (
                    <p className="error">{errorMessages[lesson.id]}</p>
                  )}
                </div>
                <div className="card-footer">
                  <button className="select-button" onClick={() => handleEnterClick(lesson)}>دخول</button>
                  <button className="select-button" onClick={() => handleSubscribeClick(lesson)}>اشتراك</button>
                </div>
              </div>
            ))
          )}

          {isModalOpen && (
            <SubscriptionModal
              lesson={selectedLesson}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  button: {
    height: "33px",
    background: "white",
    borderRadius: "7px",
    border: "1px solid #487EEA",
    color: "#487EEA",
    fontFamily: "Inter",
    fontWeight: "400",
    padding: "5 16px",
    cursor: "pointer",
    transition: "background 0.3s, color 0.3s",
  },
  link: {
    textDecoration: "none",
  },
};

export default PricingCard;
